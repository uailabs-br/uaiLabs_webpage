#!/usr/bin/env python3
"""Capture FAQ and Cases sections at desktop and mobile viewports,
with at least one accordion/collapse item expanded in each."""

import time
from playwright.sync_api import sync_playwright

URL = "http://localhost:3000"
OUT = "/Users/octopus/Documents/uailabs projects/uailabs_web/screenshots"

VIEWPORTS = {
    "desktop": {"width": 1440, "height": 1080},
    "mobile": {"width": 375, "height": 812},
}

def capture(page, section_id, label, viewport_name, expand_selector):
    """Scroll to a section, expand an item, and screenshot."""
    # Scroll section into view
    page.evaluate(f'document.getElementById("{section_id}")?.scrollIntoView({{behavior:"instant",block:"start"}})')
    time.sleep(1)

    # Wait for any entrance animations
    page.wait_for_timeout(800)

    # Click the first expandable button in the section to open it
    section = page.locator(f"#{section_id}")
    buttons = section.locator(expand_selector)
    count = buttons.count()
    print(f"  [{viewport_name}] {label}: found {count} expandable items")
    if count > 0:
        buttons.first.click()
        page.wait_for_timeout(600)  # wait for animation

    # Screenshot the section
    fname = f"{OUT}/{label}_{viewport_name}.png"
    section.screenshot(path=fname)
    print(f"  Saved: {fname}")
    return fname


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
            page.wait_for_timeout(2000)  # let animations settle

            # FAQ section
            capture(page, "faq", "faq", vp_name, "button")

            # Cases section
            capture(page, "cases", "cases", vp_name, "button")

            # Also take a full-page screenshot for context
            full_path = f"{OUT}/fullpage_{vp_name}.png"
            page.screenshot(path=full_path, full_page=True)
            print(f"  Saved full page: {full_path}")

            context.close()

        browser.close()
        print("\nDone.")


if __name__ == "__main__":
    run()
