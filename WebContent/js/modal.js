"use strict";

class Modal {
    constructor() {
        // Create the actual modal (represented by a 'div')
        this.modal = document.createElement("div");
        this.modal.id = "modal";
        this.modal.style.display = "none";
        this.modal.classList.add("modal");
        this.currenttaskId = null;

        // Create the modal content (represented by a 'div')
        var modalContent = document.createElement("div");
        modalContent.classList.add("modal-content");

        this.appendCloseButton(modalContent);

        // Prepare input-fields
        this.prepareInputFields("Id", "id", modalContent);
        this.prepareInputFields("Title", "title", modalContent);
        this.prepareInputFields("Status", "status", modalContent);

        modalContent.appendChild(document.createElement("br"));

        this.appendAddtaskButton(modalContent);
        this.appendUpdatetaskButton(modalContent);

        // Append the modal-content to the modal
        this.modal.appendChild(modalContent);
        // Append the modal to the document.body
        document.body.appendChild(this.modal);
    }

    /**
     * Prepares and inserts a label- and an input-element to a supplied
     * parent HTML-element (i.e. a "div").
     *
     * @param {string} labelText Text for our label
     * @param {string} id An id for the "id"-attribute of our "input"-tag
     * @param {HTMLElement} parent The HTML-element representing the parent
     */
    prepareInputFields(labelText, id, parent) {
        var outerDiv = document.createElement("div");

        var label = document.createElement("label");
        label.textContent = labelText + ": ";
        label.htmlFor = id;

        var input = document.createElement("input");
        input.id = id;

        outerDiv.appendChild(label);
        outerDiv.appendChild(input);
        parent.appendChild(outerDiv);
    }

    /**
     * Fill the input-fields in the modal with supplied data.
     *
     * @param {object} inputData An object containing the data we want to use
     */
    fillInputFields(inputData) {
        document.getElementById("firstname").value = inputData.firstname;
        document.getElementById("lastname").value = inputData.lastname;
        document.getElementById("address").value = inputData.address;
        document.getElementById("phone").value = inputData.phone;
    }

    /**
     * Append a "x"-button (close) to our modal-content "div"-element.
     *
     * @param {HTMLElement} modalContent An HTML "div"-element where we want to append the button
     */
    appendCloseButton(modalContent) {
        // Create the button
        var closeDiv = document.createElement("div");
        var closeButton = document.createElement("span");
        closeButton.textContent = "x"
        closeButton.classList.add("close");
        closeDiv.appendChild(closeButton);

        // Set the 'onclick'-event handler
        closeButton.addEventListener("click", () => {
            // Hide the modal
            this.modal.style.display = "none";
            // Clear the input fields
            document.getElementById("firstname").value = "";
            document.getElementById("lastname").value = "";
            document.getElementById("address").value = "";
            document.getElementById("phone").value = "";
            // Hide the buttons
            document.getElementById("modal-add-button").style.display = "none";
            document.getElementById("modal-update-button").style.display = "none";
        });

        modalContent.appendChild(closeDiv);
    }

    /**
     * Append a "Add task"-button to our modal-content "div"-element.
     *
     * @param {HTMLElement} modalContent An HTML "div"-element where we want to append the button
     */
    appendAddtaskButton(modalContent) {
        var btn = document.createElement("button");
        btn.id = "modal-add-button";
        btn.textContent = "Add task";

        // Hidden by default
        btn.style.display = "none";
        modalContent.appendChild(btn);
    }

    /**
     * Append "Update task"-button to our modal-content "div"-element.
     *
     * @param {HTMLElement} modalContent An HTML "div"-element where we want to append the button
     */
    appendUpdatetaskButton(modalContent) {
        var btn = document.createElement("button");
        btn.id = "modal-update-button";
        btn.textContent = "Update task";

        // Hidden by default
        btn.style.display = "none";
        modalContent.appendChild(btn);
    }

    /**
     * Modify (toggle) the HTMLElement.style.display-property of a given button.
     *
     * @param {string} buttonName Id of the button we want to modify
     */
    toggleButtonDisplay(buttonName) {
        var button = document.getElementById(buttonName);
        if(this.modal.contains(button)) {
            button.style = "none" ? button.style = "inline-block" : button.style = "none";
        }
    }

    /**
     * Toggle the HMTLElement.style.display-propery of our modal.
     */
    toggleModalDisplay() {
        var style;
        this.modal.style.display ? style = this.modal.style.display : style = getComputedStyle(this.modal).display;
        style == "none" ? this.modal.style.display = "block" : this.modal.style.display = "none";
    }
}
