from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
import yfinance as yf
import pandas as pd
from datetime import datetime, timedelta
import json

app = FastAPI()

class StockRequest(BaseModel):
    symbol: str
    period: str = "1d"
    interval: str = "1m"

class StockResponse(BaseModel):
    symbol: str
    data: List[Dict[str, Any]]
    info: Dict[str, Any]

@app.get("/api/stock/{symbol}")
async def get_stock_data(symbol: str, period: str = "1d", interval: str = "1m"):
    try:
        # Get stock data from Yahoo Finance
        stock = yf.Ticker(symbol)
        hist = stock.history(period=period, interval=interval)
        
        # Convert to list of dictionaries
        data = []
        for index, row in hist.iterrows():
            data.append({
                "timestamp": int(index.timestamp() * 1000),
                "open": float(row["Open"]),
                "high": float(row["High"]),
                "low": float(row["Low"]),
                "close": float(row["Close"]),
                "volume": int(row["Volume"])
            })
        
        # Get stock info
        info = stock.info
        
        # Clean up info to make it JSON serializable
        clean_info = {}
        for key, value in info.items():
            if isinstance(value, (str, int, float, bool, type(None))):
                clean_info[key] = value
            else:
                clean_info[key] = str(value)
        
        return {
            "symbol": symbol,
            "data": data,
            "info": clean_info
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/search/{query}")
async def search_stocks(query: str):
    try:
        # This is a simplified search - in a real app, you'd use a more sophisticated search
        tickers = yf.Tickers(query)
        results = []
        
        for ticker in tickers.tickers:
            try:
                info = ticker.info
                results.append({
                    "symbol": info.get("symbol", ""),
                    "name": info.get("shortName", ""),
                    "exchange": info.get("exchange", ""),
                    "type": "stock"
                })
            except:
                pass
                
        return {"results": results}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/market/trending")
async def get_trending_stocks():
    # This would typically fetch from a real API
    # For demo purposes, we'll return some hardcoded trending stocks
    trending = [
        {"symbol": "AAPL", "name": "Apple Inc.", "change": 1.2},
        {"symbol": "MSFT", "name": "Microsoft Corporation", "change": 0.8},
        {"symbol": "GOOGL", "name": "Alphabet Inc.", "change": -0.5},
        {"symbol": "AMZN", "name": "Amazon.com, Inc.", "change": 2.1},
        {"symbol": "TSLA", "name": "Tesla, Inc.", "change": -1.3}
    ]
    
    return {"trending": trending}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
