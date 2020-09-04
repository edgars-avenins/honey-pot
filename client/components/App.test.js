import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import App from '../../client/components/App'

test('App renders Nav component', () => {
    render(<App />)
    return screen.findAllByRole('nav')
        .then(nav => {
            expect(nav[0]).toBeTruthy()
        })
})

test('App renders heading part in Home component', () => {
    render(<App />)
    return screen.findAllByRole('heading')
        .then(heading => {
            expect(heading[0]).toHaveTextContent('Hi, this site offers a use for')
        })
})

test('App renders 3 section items in Home component', () => {
    render(<App />)
    return screen.findAllByRole('sectionItem')
        .then(secItems => {
            expect(secItems).toHaveLength(3)
        })
})

test('App renders 3 links to website features in Home Component', () => {
    render(<App />)
    return screen.findAllByRole('featureItemLink')
        .then(links => {
            expect(links).toHaveLength(3)
        })
})