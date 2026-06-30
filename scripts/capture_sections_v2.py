#!/usr/bin/env python3
"""Capture FAQ and Cases sections with animations triggered and items expanded."""

import time
from playwright.sync_api import sync_playwright

URL = "http://localhost:3000"
OUT = "/Users/octopus/Documents/uailabs projects/uailabs_web/screenshots"

VIEWPORTS = {
    "desktop": {"width": 1440, "height": 1080},
    "mobile": {"width": 375, "height": 812},
}


def slow_scroll_to_bottom(page):
    """Scroll the page slowly so that all whileInView animations trigger."""
    total_height = page.evaluate("document.body.scrollHeight")
    viewport_height = page.evaluate("window.innerHeight")
    current = 0
    step = viewport_height // 3
    while current < total_height:
        current += step
        page.evaluate(f"window.scrollTo(0, {current})")
        page.wait_for_timeout(300)
    # Scroll back to top
    page.evaluate("window.scrollTo(0, 0)")
    page.wait_for_timeout(500)


def capture_section(page, section_id, label, viewport_name):
    """Scroll to a section, expand the first item, and take a screenshot."""
    # Scroll to the section
    page.evaluate(
        f'document.getElementById("{section_id}")?.scrollIntoView({{behavior:"instant",block:"start"}})'
    )
    page.wait_for_timeout(800)

    # Find and click the first button inside the section to expand it
    section = page.locator(f"#{section_id}")
    buttons = section.locator("button")
    count = buttons.count()
    print(f"  [{viewport_name}] {label}: found {count} expandable items")

    if count > 0:
        buttons.first.click()
        page.wait_for_timeout(800)  # wait for expand animation

    # Take a screenshot of the section element
    fname = f"{OUT}/{label}_{viewport_name}.png"
    section.screenshot(path=fname)
    print(f"  Saved: {fname}")

    # Also take a viewport-based screenshot for context (what the user sees)
    context_fname = f"{OUT}/{label}_{viewport_name}_viewport.png"
    page.screenshot(path=context_fname)
    print(f"  Saved viewport: {context_fname}")


def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)

        for vp_name, vp in VIEWPORTS.items():
            print(f"\n=== Viewport: {vp_name} ({vp['width']}x{vp['height']}) ===")
            context = browser.new_context(
                viewport=vp,
                device_scale_factor=2,
            )
            page = context.new_page()
            page.goto(URL, wait_until="networkidle", timeout=30000)
            page.wait_for_timeout(2000)

            # Slowly scroll through entire page to trigger all whileInView animations
            print("  Scrolling to trigger animations...")
            slow_scroll_to_bottom(page)
            page.wait_for_timeout(500)

            # Capture FAQ
            capture_section(page, "faq", "faq", vp_name)

            # Capture Cases
            capture_section(page, "cases", "cases", vp_name)

            context.close()

        browser.close()
        print("\nDone.")


if __name__ == "__main__":
    run()
