#!/usr/bin/env python3
"""Capture FAQ and Cases sections with proper viewport clipping."""

from playwright.sync_api import sync_playwright

URL = "http://localhost:3000"
OUT = "/Users/octopus/Documents/uailabs projects/uailabs_web/screenshots"

VIEWPORTS = {
    "desktop": {"width": 1440, "height": 1080},
    "mobile": {"width": 375, "height": 812},
}


def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)

        for vp_name, vp in VIEWPORTS.items():
            print(f"\n=== Viewport: {vp_name} ({vp['width']}x{vp['height']}) ===")
            context = browser.new_context(viewport=vp, device_scale_factor=2)
            page = context.new_page()
            page.goto(URL, wait_until="networkidle", timeout=30000)
            page.wait_for_timeout(2000)

            # Scroll slowly through the full page to trigger all animations
            total = page.evaluate("document.body.scrollHeight")
            step = vp["height"] // 2
            pos = 0
            while pos < total:
                pos += step
                page.evaluate(f"window.scrollTo(0, {pos})")
                page.wait_for_timeout(250)
            page.wait_for_timeout(500)

            # --- FAQ Section ---
            print("  Capturing FAQ...")
            page.evaluate('document.getElementById("faq").scrollIntoView({block:"center"})')
            page.wait_for_timeout(800)

            # Click the first FAQ item to expand it
            faq = page.locator("#faq")
            faq_buttons = faq.locator("button")
            print(f"  FAQ buttons found: {faq_buttons.count()}")
            if faq_buttons.count() > 0:
                faq_buttons.first.click()
                page.wait_for_timeout(600)

            # Take viewport screenshot showing FAQ
            page.screenshot(path=f"{OUT}/faq_{vp_name}.png")
            print(f"  Saved: {OUT}/faq_{vp_name}.png")

            # Scroll down slightly to capture more FAQ items if needed
            page.evaluate("window.scrollBy(0, 200)")
            page.wait_for_timeout(300)
            page.screenshot(path=f"{OUT}/faq_{vp_name}_scrolled.png")
            print(f"  Saved: {OUT}/faq_{vp_name}_scrolled.png")

            # --- Cases Section ---
            print("  Capturing Cases...")
            page.evaluate('document.getElementById("cases").scrollIntoView({block:"start"})')
            page.wait_for_timeout(800)

            # Click the first case row to expand it
            cases = page.locator("#cases")
            cases_buttons = cases.locator("button")
            print(f"  Cases buttons found: {cases_buttons.count()}")
            if cases_buttons.count() > 0:
                cases_buttons.first.click()
                page.wait_for_timeout(600)

            # Take viewport screenshot showing Cases
            page.screenshot(path=f"{OUT}/cases_{vp_name}.png")
            print(f"  Saved: {OUT}/cases_{vp_name}.png")

            # Scroll down to capture more case rows
            page.evaluate("window.scrollBy(0, 300)")
            page.wait_for_timeout(300)
            page.screenshot(path=f"{OUT}/cases_{vp_name}_scrolled.png")
            print(f"  Saved: {OUT}/cases_{vp_name}_scrolled.png")

            context.close()

        browser.close()
        print("\nDone.")


if __name__ == "__main__":
    run()
