import { FormGroup } from "@angular/forms";

// Function to check if the form has any errors
export function hasFormErrors(form: FormGroup): boolean {
    // Iterate over all controls in the form
    for (const controlName in form.controls) {
        if (form.controls.hasOwnProperty(controlName)) {
            const control = form.get(controlName);

            // Check if the control has any errors
            if (control?.errors) {
                return true; // There is at least one error in the form
            }
        }
    }

    return false; // No errors found in the form
}

export const validateEmail = (email: string) => {
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (email.match(validRegex)) {
        return true;
    } else {
        return false;
    }
}