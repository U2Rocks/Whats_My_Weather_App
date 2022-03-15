import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'
import Weatherform from '../components/Weatherform'
import React from 'react'

// test currently gives [ReferenceError: regeneratorRuntime is not defined]

describe("Test if basic form operations work", () => {
    it("text field can recieve input and change value", () => {

        // define input functions for the form test
        const apiExample = () => {
            let response = { formLat: 1, formLon: 1}
            return response
        }

        const weatherExample = ( object ) => {
            let response2 = object
        }

        // render the component
        render(<Weatherform getAPIFunction={apiExample} getWeatherFunction={weatherExample}/>)

        // grab the form and expect it to be visible
        const wForm = screen.getByRole("form")
        expect(wForm).toBeVisible()

        // grab form fields and add text to input and click button
        const textEntry = screen.getByPlaceholderText("Enter a City...")
        const buttonSubmit = screen.getByRole("button")
        const testText = "London"

        userEvent.type(textEntry, testText)
        expect(textEntry.textContent).toHaveValue(testText)

        userEvent.click(buttonSubmit)

        // check if form fields empty after button clicked
        expect(textEntry.textContent).toHaveValue("")

    })
})

