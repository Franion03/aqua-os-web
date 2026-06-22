import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from '../App'

describe('App', () => {
  it('renders the sidebar with AquaOS branding', () => {
    render(<App />)
    expect(screen.getAllByText('AquaOS').length).toBeGreaterThan(0)
  })

  it('shows Dashboard page by default', () => {
    render(<App />)
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
  })

  it('navigates to Levels page on tab click', () => {
    render(<App />)
    fireEvent.click(screen.getAllByText('Levels')[0])
    expect(screen.getByText('Training Levels')).toBeInTheDocument()
  })

  it('navigates to Planner page on tab click', () => {
    render(<App />)
    fireEvent.click(screen.getAllByText('Planner')[0])
    expect(screen.getByText('Planner')).toBeInTheDocument()
  })
})
