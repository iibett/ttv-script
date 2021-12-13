/// reddit.js
(function () {
    'use strict';
    const setDarkMode = on => {
        if ((getComputedStyle(document.getElementsByTagName("header")[0].firstElementChild).getPropertyValue('--newRedditTheme-body').trim() == "#1A1A1B") != on) {
            let repeat_until_successful = (function_ptr, interval) => {
                if (!function_ptr())
                    setTimeout(() => {
                        repeat_until_successful(function_ptr, interval);
                    }, interval);
            }
            repeat_until_successful(() => {
                let preferences_button = document.querySelector("#USER_DROPDOWN_ID");
                if (preferences_button == null)
                    return false;
                if (document.evaluate('/html/body/div/div[@role="menu"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue == null) {
                    preferences_button.click();
                    return false;
                }
                let night_mode_button = document.evaluate('/html/body/div/div[@role="menu"]//button/div[.="Night Mode"]/../button', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                if (night_mode_button == null)
                    return false;
                night_mode_button.click();
                return true;
            }, 10);
        }
    }
    if (window.matchMedia) {
        setDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => setDarkMode(e.matches));
    } else {
        let hour = (new Date()).getHours();
        setDarkMode(hour > 18 || hour < 8);
    }
})();
