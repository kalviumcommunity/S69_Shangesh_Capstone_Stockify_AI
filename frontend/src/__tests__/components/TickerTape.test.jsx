import React from 'react';
import { render, screen } from '@testing-library/react';
import { TickerTape } from 'react-ts-tradingview-widgets';

// Mock the TickerTape component
jest.mock('react-ts-tradingview-widgets', () => ({
  TickerTape: jest.fn().mockImplementation(props => (
    <div data-testid="ticker-tape">
      <div>Mock TickerTape Widget</div>
      <div data-colortheme={props.colorTheme}></div>
      <div data-largecharturl={props.largeChartUrl}></div>
      <div data-symbols={JSON.stringify(props.symbols || [])}></div>
    </div>
  )),
}));

describe('TickerTape Widget', () => {
  const mockProps = {
    colorTheme: 'light',
    largeChartUrl: 'https://stockify-pink.vercel.app/analysis',
    symbols: [
      { proName: 'RELIANCE', title: 'Reliance Industries' },
      { proName: 'WIPRO', title: 'WIPRO LTD' }
    ]
  };

  test('renders with correct props', () => {
    render(<TickerTape {...mockProps} />);
    
    // Check if the component is rendered
    const tickerTape = screen.getByTestId('ticker-tape');
    expect(tickerTape).toBeInTheDocument();
    
    // Check if props are passed correctly
    expect(tickerTape.querySelector('[data-colortheme]')).toHaveAttribute('data-colortheme', 'light');
    expect(tickerTape.querySelector('[data-largecharturl]')).toHaveAttribute('data-largecharturl', 'https://stockify-pink.vercel.app/analysis');
    
    // Check symbols data
    const symbolsString = tickerTape.querySelector('[data-symbols]').getAttribute('data-symbols');
    const symbolsData = JSON.parse(symbolsString);
    expect(symbolsData).toHaveLength(2);
    expect(symbolsData[0].proName).toBe('RELIANCE');
    expect(symbolsData[0].title).toBe('Reliance Industries');
    expect(symbolsData[1].proName).toBe('WIPRO');
    expect(symbolsData[1].title).toBe('WIPRO LTD');
  });
}); 