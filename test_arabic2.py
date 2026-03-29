from playwright.sync_api import sync_playwright
import time

def test_arabic_layout():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to local server
        page.goto("http://localhost:3000")

        # Wait for loading to finish
        page.wait_for_selector(".parallax-container", timeout=10000)

        # Switch to Arabic
        # The button has text "🇸🇦 AR"
        ar_btn = page.locator('button', has_text="AR")
        ar_btn.click()

        # Wait a bit for layout to update
        page.wait_for_timeout(1000)

        # Scroll to Services section
        page.evaluate("document.querySelector('#services').scrollIntoView()")
        page.wait_for_timeout(1000)
        page.screenshot(path="arabic_services.png")

        # Scroll to Contact section
        page.evaluate("document.querySelector('#contact').scrollIntoView()")
        page.wait_for_timeout(1000)
        page.screenshot(path="arabic_contact.png")

        browser.close()

if __name__ == "__main__":
    test_arabic_layout()
