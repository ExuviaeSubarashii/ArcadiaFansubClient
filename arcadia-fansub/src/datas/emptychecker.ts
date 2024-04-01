import { browser } from "$app/environment";

export function IsNullOrEmpty(value: any) {
    if (browser) {

        if (value=== null || value === undefined || value=== undefined || value === "" || value === '' || value === 'undefined') {
            return true;
        }
        else {
            return false;
        }
    }
}
