'use client'

import Image from 'next/image'
import { useState, useEffect, CSSProperties } from 'react'

export default function XendItWebsite() {
  const [currentPage, setCurrentPage] = useState('splash')
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [tokenPrice, setTokenPrice] = useState('Loading...')
  const [activeTab, setActiveTab] = useState('about')
  const [buttonHover, setButtonHover] = useState(false)
  const [xButtonHover, setXButtonHover] = useState(false)
  const [telegramButtonHover, setTelegramButtonHover] = useState(false)

  // Market data states
  const [marketData, setMarketData] = useState({
    price: 'Loading...',
    marketCap: 'Loading...',
    volume24h: 'Loading...',
    priceChange24h: 0,
    priceChangePercentage24h: 0,
    circulatingSupply: 'Loading...',
    totalSupply: 'Loading...',
    ath: 'Loading...',
    athChangePercentage: 0,
    atl: 'Loading...',
    atlChangePercentage: 0
  })

  // Debug logging
  console.log('Current state:', { currentPage, isTransitioning })

  // Fetch comprehensive market data
  useEffect(() => {
    if (currentPage === 'home') {
      const fetchMarketData = async () => {
        try {
          // Fetch detailed market data
          const response = await fetch(
            'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=xend-it&order=market_cap_desc&per_page=1&page=1&sparkline=false&price_change_percentage=24h'
          )
          const data = await response.json()

          if (data && data[0]) {
            const coin = data[0]
            setTokenPrice(`${coin.current_price?.toFixed(8) || '0.00'}`)
            setMarketData({
              price: `${coin.current_price?.toFixed(8) || '0.00'}`,
              marketCap: `${(coin.market_cap / 1000000).toFixed(3)}M` || 'N/A',
              volume24h: `${(coin.total_volume / 1000).toFixed(1)}K` || 'N/A',
              priceChange24h: coin.price_change_24h || 0,
              priceChangePercentage24h: coin.price_change_percentage_24h || 0,
              circulatingSupply: coin.circulating_supply ?
                `${(coin.circulating_supply / 1000000000).toFixed(2)}B` : 'N/A',
              totalSupply: coin.total_supply ?
                `${(coin.total_supply / 1000000000).toFixed(2)}B` : 'N/A',
              ath: `${coin.ath?.toFixed(8) || '0.00'}`,
              athChangePercentage: coin.ath_change_percentage || 0,
              atl: `${coin.atl?.toFixed(10) || '0.00'}`,
              atlChangePercentage: coin.atl_change_percentage || 0
            })
          }
        } catch (error) {
          console.error('Error fetching market data:', error)
          // Fallback to simple price endpoint
          try {
            const fallbackResponse = await fetch(
              'https://api.coingecko.com/api/v3/simple/price?ids=xend-it&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true'
            )
            const fallbackData = await fallbackResponse.json()
            if (fallbackData['xend-it']) {
              const price = fallbackData['xend-it'].usd || 0
              setTokenPrice(`${price.toFixed(8)}`)
              setMarketData(prev => ({
                ...prev,
                price: `${price.toFixed(8)}`,
                marketCap: fallbackData['xend-it'].usd_market_cap ?
                  `${(fallbackData['xend-it'].usd_market_cap / 1000000).toFixed(3)}M` : 'N/A',
                volume24h: fallbackData['xend-it'].usd_24h_vol ?
                  `${(fallbackData['xend-it'].usd_24h_vol / 1000).toFixed(1)}K` : 'N/A',
                priceChangePercentage24h: fallbackData['xend-it'].usd_24h_change || 0
              }))
            }
          } catch (fallbackError) {
            console.error('Fallback fetch failed:', fallbackError)
            setTokenPrice('$0.00004000')
          }
        }
      }

      // Initial fetch
      fetchMarketData()

      // Set up interval to update every 30 seconds
      const interval = setInterval(fetchMarketData, 30000)

      return () => clearInterval(interval)
    }
  }, [currentPage])

  // Hyperspace Transition Component
  const HyperspaceTransition = () => (
    <>
      <div style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#000000',
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}>
        {/* Hyperspace lines */}
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: '1px',
              background: 'linear-gradient(to right, transparent, #e6ffc0ff, transparent)',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              height: `${50 + Math.random() * 200}px`,
              transform: `rotate(${Math.random() * 360}deg)`,
              animation: `hyperspaceMove 0.5s linear infinite`,
              animationDelay: `${Math.random() * 0.5}s`
            } as CSSProperties}
          />
        ))}

        <div style={{
          fontSize: '4rem',
          fontWeight: 'bold',
          color: '#ffffffff',
          animation: 'pulse 0.5s ease-in-out infinite',
          zIndex: 10
        } as CSSProperties}>
          XENDING...
        </div>
      </div>

      <style jsx global>{`
        @keyframes hyperspaceMove {
          from {
            transform: translateZ(0) scale(1);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          to {
            transform: translateZ(1000px) scale(10);
            opacity: 0;
          }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px); 
            opacity: 0.6;
          }
          50% { 
            transform: translateY(-20px); 
            opacity: 1;
          }
        }
      `}</style>
    </>
  )

  // Show transition when isTransitioning is true
  if (isTransitioning) {
    return <HyperspaceTransition />
  }

  // Splash Page
  if (currentPage === 'splash') {
    return (
      <>
        <div style={{
          minHeight: '100vh',
          backgroundColor: '#000000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative'
        }}>
          {/* Simple animated dots */}
          {Array.from({ length: 20 }, (_, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                width: '3px',
                height: '3px',
                backgroundColor: '#ffffffff',
                borderRadius: '50%',
                left: `${(i * 23) % 100}%`,
                top: `${(i * 17) % 100}%`,
                animation: `twinkle ${2 + (i % 2)}s ease-in-out infinite`,
                animationDelay: `${(i * 0.3) % 2}s`
              } as CSSProperties}
            />
          ))}

          {/* Main Button */}
          <button
            onClick={() => {
              console.log('Button clicked!')
              setIsTransitioning(true)
              console.log('Transitioning set to true')
              setTimeout(() => {
                console.log('Timeout executed, switching to home')
                setCurrentPage('home')
                setIsTransitioning(false)
              }, 2000)
            }}
            onMouseEnter={() => setButtonHover(true)}
            onMouseLeave={() => setButtonHover(false)}
            style={{
              padding: '20px 40px',
              fontSize: '3rem',
              fontWeight: 'bold',
              backgroundColor: '#84cc16',
              color: '#000000',
              border: '4px solid #f5ff67ff',
              borderRadius: '12px',
              cursor: 'pointer',
              zIndex: 10,
              fontFamily: 'monospace',
              transition: 'transform 0.3s, box-shadow 0.3s',
              transform: buttonHover ? 'scale(1.05)' : 'scale(1)',
              boxShadow: buttonHover ? '0 0 30px rgba(132, 204, 22, 0.5)' : 'none'
            }}
          >
            XEND IT!
          </button>

          {/* Small logo */}
          <Image
            src="https://i.imgur.com/ytQ3idg.png"
            alt="Logo"
            width={200}
            height={200}
            style={{
              position: 'absolute',
              top: '20px',
              left: '20px',
              zIndex: 5,
              animation: 'bounce 2s ease-in-out infinite'
            } as CSSProperties}
            unoptimized
          />
        </div>

        <style jsx global>{`
          @keyframes twinkle {
            0%, 100% { opacity: 0.3; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.5); }
          }
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
        `}</style>
      </>
    )
  }

  // Home Page
  if (currentPage === 'home') {
    return (
      <>
        <div style={{
          minHeight: '100vh',
          backgroundColor: '#000000',
          color: '#ffffff',
          padding: '20px'
        }}>
          {/* Floating particles */}
          {Array.from({ length: 15 }, (_, i) => (
            <div
              key={i}
              style={{
                position: 'fixed',
                width: '2px',
                height: '2px',
                backgroundColor: '#ffffffff',
                borderRadius: '50%',
                left: `${(i * 31) % 100}%`,
                top: `${(i * 19) % 100}%`,
                animation: `float ${3 + (i % 3)}s ease-in-out infinite`,
                animationDelay: `${(i * 0.5) % 3}s`,
                zIndex: 1
              } as CSSProperties}
            />
          ))}

          {/* Top bar */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '30px',
            zIndex: 10,
            position: 'relative'
          }}>
            <Image
              src="https://i.imgur.com/ytQ3idg.png"
              alt="Logo"
              width={200}
              height={200}
              style={{
                animation: 'bounce 2s ease-in-out infinite'
              } as CSSProperties}
              unoptimized
            />
            <div style={{
              backgroundColor: '#84cc16',
              color: '#000000',
              padding: '8px 16px',
              borderRadius: '8px',
              fontWeight: 'bold'
            }}>
              $XEND: {tokenPrice}
            </div>
          </div>

          {/* Main content container */}
          <div style={{
            maxWidth: '1000px',
            margin: '0 auto',
            zIndex: 10,
            position: 'relative'
          }}>

            {/* Stats Table */}
            <div style={{
              backgroundColor: 'rgba(0, 0, 0, 0.9)',
              border: '2px solid #84cc16',
              borderRadius: '12px',
              padding: '20px',
              marginBottom: '30px',
              boxShadow: '0 0 20px rgba(132, 204, 22, 0.2)'
            }}>
              <h2 style={{
                color: '#84cc16',
                textAlign: 'center',
                marginBottom: '20px',
                fontSize: '1.5rem',
                fontWeight: 'bold'
              }}>
                $XEND TOKEN STATS
              </h2>

              <div style={{
                fontSize: '0.75rem',
                color: '#84cc16',
                textAlign: 'center',
                marginBottom: '15px',
                opacity: 0.7
              }}>
                Live data from CoinGecko • Updates every 30 seconds
              </div>

              <table style={{
                width: '100%',
                borderCollapse: 'collapse'
              }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #84cc16' }}>
                    <th style={{ color: '#84cc16', textAlign: 'left', padding: '12px', fontSize: '0.9rem' }}>Metric</th>
                    <th style={{ color: '#84cc16', textAlign: 'right', padding: '12px', fontSize: '0.9rem' }}>Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid rgba(132, 204, 22, 0.2)' }}>
                    <td style={{ padding: '12px', color: '#ffffff' }}>Price</td>
                    <td style={{ padding: '12px', color: '#eab308', fontWeight: 'bold', textAlign: 'right' }}>
                      {marketData.price}
                    </td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(132, 204, 22, 0.2)' }}>
                    <td style={{ padding: '12px', color: '#ffffff' }}>24h Change</td>
                    <td style={{
                      padding: '12px',
                      color: marketData.priceChangePercentage24h >= 0 ? '#10b981' : '#ef4444',
                      fontWeight: 'bold',
                      textAlign: 'right'
                    }}>
                      {marketData.priceChangePercentage24h >= 0 ? '+' : ''}{marketData.priceChangePercentage24h.toFixed(2)}%
                    </td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(132, 204, 22, 0.2)' }}>
                    <td style={{ padding: '12px', color: '#ffffff' }}>Market Cap</td>
                    <td style={{ padding: '12px', color: '#eab308', fontWeight: 'bold', textAlign: 'right' }}>
                      {marketData.marketCap}
                    </td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(132, 204, 22, 0.2)' }}>
                    <td style={{ padding: '12px', color: '#ffffff' }}>24h Volume</td>
                    <td style={{ padding: '12px', color: '#ffffff', textAlign: 'right' }}>
                      {marketData.volume24h}
                    </td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(132, 204, 22, 0.2)' }}>
                    <td style={{ padding: '12px', color: '#ffffff' }}>Circulating Supply</td>
                    <td style={{ padding: '12px', color: '#ffffff', textAlign: 'right' }}>
                      {marketData.circulatingSupply}
                    </td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(132, 204, 22, 0.2)' }}>
                    <td style={{ padding: '12px', color: '#ffffff' }}>All-Time High</td>
                    <td style={{ padding: '12px', color: '#10b981', textAlign: 'right' }}>
                      {marketData.ath}
                      <span style={{ fontSize: '0.75rem', color: '#84cc16', marginLeft: '5px' }}>
                        ({marketData.athChangePercentage > 0 ? '+' : ''}{marketData.athChangePercentage.toFixed(1)}%)
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ padding: '12px', color: '#ffffff' }}>All-Time Low</td>
                    <td style={{ padding: '12px', color: '#ef4444', textAlign: 'right' }}>
                      {marketData.atl}
                      <span style={{ fontSize: '0.75rem', color: '#84cc16', marginLeft: '5px' }}>
                        (+{Math.abs(marketData.atlChangePercentage).toFixed(1)}%)
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Tabs */}
            <div style={{
              backgroundColor: 'rgba(0, 0, 0, 0.9)',
              border: '2px solid #84cc16',
              borderRadius: '12px',
              padding: '20px',
              boxShadow: '0 0 20px rgba(132, 204, 22, 0.2)'
            }}>
              {/* Tab buttons */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gap: '10px',
                marginBottom: '20px',
                backgroundColor: '#000000',
                border: '2px solid #84cc16',
                borderRadius: '8px',
                padding: '5px'
              }}>
                {['about', 'buy', 'social'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    style={{
                      padding: '12px',
                      backgroundColor: activeTab === tab ? '#84cc16' : 'transparent',
                      color: activeTab === tab ? '#000000' : '#84cc16',
                      border: 'none',
                      borderRadius: '6px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      textTransform: 'capitalize',
                      transition: 'all 0.3s'
                    }}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Tab content */}
              <div>
                {activeTab === 'about' && (
                  <div>
                    <h2 style={{
                      color: '#ffffffff',
                      fontSize: '2rem',
                      marginBottom: '20px',
                      textAlign: 'center'
                    }}>
                      Pronounced: &apos;SEND&apos; but wif a &apos;X&apos;
                    </h2>
                  </div>
                )}

                {activeTab === 'buy' && (
                  <div>
                    <h2 style={{
                      color: '#84cc16',
                      fontSize: '2rem',
                      marginBottom: '10px',
                      textAlign: 'center'
                    }}>
                      Buy $XEND Instantly
                    </h2>
                    <p style={{
                      textAlign: 'center',
                      color: '#84cc16',
                      marginBottom: '25px',
                      fontSize: '0.9rem',
                      opacity: 0.8
                    }}>
                      Swap SOL for $XEND directly on this page
                    </p>

                    {/* Chart and Swap Section */}
                    <div style={{
                      backgroundColor: 'rgba(132, 204, 22, 0.05)',
                      border: '2px solid #84cc16',
                      borderRadius: '12px',
                      padding: '20px',
                      marginBottom: '25px'
                    }}>
                      {/* Swap Buttons - Prominent at Top */}
                      <div style={{
                        marginBottom: '20px',
                        textAlign: 'center'
                      }}>
                        <h3 style={{
                          color: '#84cc16',
                          fontSize: '1.2rem',
                          marginBottom: '15px',
                          fontWeight: 'bold'
                        }}>
                          🚀 Quick Buy $XEND - copy & paste ca!
                        </h3>
                        <div style={{
                          display: 'grid',
                          gridTemplateColumns: '1fr 1fr',
                          gap: '15px',
                          maxWidth: '400px',
                          margin: '0 auto'
                        }}>
                          <a
                            href="https://jup.ag/swap/SOL-ERtzyCSu9FPvdxwsUS13cueHfFWQNkSvbKh5nTpUpump"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              backgroundColor: '#84cc16',
                              color: '#000000',
                              padding: '15px 20px',
                              borderRadius: '8px',
                              textDecoration: 'none',
                              fontWeight: 'bold',
                              fontSize: '1rem',
                              transition: 'all 0.3s',
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              gap: '5px',
                              border: '2px solid transparent'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = '#eab308'
                              e.currentTarget.style.transform = 'scale(1.05)'
                              e.currentTarget.style.border = '2px solid #84cc16'
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = '#84cc16'
                              e.currentTarget.style.transform = 'scale(1)'
                              e.currentTarget.style.border = '2px solid transparent'
                            }}
                          >
                            <span style={{ fontSize: '1.5rem' }}>🪐</span>
                            <span>Buy on Jupiter</span>
                          </a>
                          <a
                            href="https://raydium.io/swap/?inputMint=sol&outputMint=ERtzyCSu9FPvdxwsUS13cueHfFWQNkSvbKh5nTpUpump"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              backgroundColor: '#84cc16',
                              color: '#000000',
                              padding: '15px 20px',
                              borderRadius: '8px',
                              textDecoration: 'none',
                              fontWeight: 'bold',
                              fontSize: '1rem',
                              transition: 'all 0.3s',
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              gap: '5px',
                              border: '2px solid transparent'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = '#eab308'
                              e.currentTarget.style.transform = 'scale(1.05)'
                              e.currentTarget.style.border = '2px solid #84cc16'
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = '#84cc16'
                              e.currentTarget.style.transform = 'scale(1)'
                              e.currentTarget.style.border = '2px solid transparent'
                            }}
                          >
                            <span style={{ fontSize: '1.5rem' }}>🔄</span>
                            <span>Buy on Raydium</span>
                          </a>
                        </div>
                      </div>

                      {/* DexScreener Chart */}
                      <div style={{
                        borderTop: '1px solid rgba(132, 204, 22, 0.3)',
                        paddingTop: '20px'
                      }}>
                        <h3 style={{
                          color: '#84cc16',
                          fontSize: '1rem',
                          marginBottom: '15px',
                          textAlign: 'center',
                          opacity: 0.8
                        }}>
                          📊 Live Price Chart
                        </h3>
                        <iframe
                          src="https://dexscreener.com/solana/ft9pg1expv89kksi5lb9c25zbms8sre7hmz6axymc7jw?embed=1&theme=dark&trades=0&info=0"
                          width="100%"
                          height="400"
                          style={{
                            border: 'none',
                            borderRadius: '8px'
                          }}
                        />
                      </div>
                    </div>

                    {/* Contract Info Section */}
                    <div style={{
                      backgroundColor: 'rgba(234, 179, 8, 0.1)',
                      border: '1px solid #eab308',
                      borderRadius: '8px',
                      padding: '15px',
                      marginBottom: '20px'
                    }}>
                      <h3 style={{
                        color: '#eab308',
                        fontSize: '1rem',
                        marginBottom: '10px',
                        fontWeight: 'bold'
                      }}>
                        📋 Token Address
                      </h3>
                      <div style={{
                        backgroundColor: '#000000',
                        padding: '10px',
                        borderRadius: '6px',
                        fontFamily: 'monospace',
                        fontSize: '0.85rem',
                        color: '#84cc16',
                        wordBreak: 'break-all',
                        cursor: 'pointer'
                      }}
                        onClick={() => {
                          navigator.clipboard.writeText('ERtzyCSu9FPvdxwsUS13cueHfFWQNkSvbKh5nTpUpump')
                          alert('Token address copied!')
                        }}>
                        ERtzyCSu9FPvdxwsUS13cueHfFWQNkSvbKh5nTpUpump
                        <span style={{
                          marginLeft: '10px',
                          fontSize: '0.75rem',
                          color: '#eab308'
                        }}>
                          (click to copy)
                        </span>
                      </div>
                    </div>

                    {/* Additional Links */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '15px',
                      marginTop: '20px'
                    }}>
                      <a
                        href="https://jup.ag/tokens/ERtzyCSu9FPvdxwsUS13cueHfFWQNkSvbKh5nTpUpump"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          backgroundColor: 'rgba(132, 204, 22, 0.1)',
                          border: '1px solid #84cc16',
                          color: '#84cc16',
                          padding: '12px',
                          borderRadius: '8px',
                          textDecoration: 'none',
                          fontWeight: 'bold',
                          textAlign: 'center',
                          transition: 'all 0.3s',
                          fontSize: '0.9rem'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#84cc16'
                          e.currentTarget.style.color = '#000000'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(132, 204, 22, 0.1)'
                          e.currentTarget.style.color = '#84cc16'
                        }}
                      >
                        🪐 Jupiter Page
                      </a>

                      <a
                        href="https://dexscreener.com/solana/ft9pg1expv89kksi5lb9c25zbms8sre7hmz6axymc7jw"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          backgroundColor: 'rgba(132, 204, 22, 0.1)',
                          border: '1px solid #84cc16',
                          color: '#84cc16',
                          padding: '12px',
                          borderRadius: '8px',
                          textDecoration: 'none',
                          fontWeight: 'bold',
                          textAlign: 'center',
                          transition: 'all 0.3s',
                          fontSize: '0.9rem'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#84cc16'
                          e.currentTarget.style.color = '#000000'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(132, 204, 22, 0.1)'
                          e.currentTarget.style.color = '#84cc16'
                        }}
                      >
                        📊 View Charts
                      </a>
                    </div>
                  </div>
                )}

                {activeTab === 'social' && (
                  <div>
                    <h2 style={{ color: '#84cc16', fontSize: '2rem', marginBottom: '20px' }}>
                      Join the Community
                    </h2>
                    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '20px' }}>
                      <a
                        href="https://x.com/i/communities/1953459548263469520"
                        target="_blank"
                        rel="noopener noreferrer"
                        onMouseEnter={() => setXButtonHover(true)}
                        onMouseLeave={() => setXButtonHover(false)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          backgroundColor: xButtonHover ? '#eab308' : '#84cc16',
                          color: '#000000',
                          padding: '15px 25px',
                          borderRadius: '8px',
                          textDecoration: 'none',
                          fontWeight: 'bold',
                          flex: '1',
                          minWidth: '200px',
                          transition: 'all 0.3s',
                          transform: xButtonHover ? 'scale(1.05)' : 'scale(1)'
                        }}
                      >
                        <span style={{ fontSize: '1.5rem' }}>⚡️</span>
                        Follow on X
                      </a>

                      <a
                        href="https://t.me/xend_it"
                        target="_blank"
                        rel="noopener noreferrer"
                        onMouseEnter={() => setTelegramButtonHover(true)}
                        onMouseLeave={() => setTelegramButtonHover(false)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          backgroundColor: telegramButtonHover ? '#eab308' : '#84cc16',
                          color: '#000000',
                          padding: '15px 25px',
                          borderRadius: '8px',
                          textDecoration: 'none',
                          fontWeight: 'bold',
                          flex: '1',
                          minWidth: '200px',
                          transition: 'all 0.3s',
                          transform: telegramButtonHover ? 'scale(1.05)' : 'scale(1)'
                        }}
                      >
                        <span style={{ fontSize: '1.5rem' }}>👉👈</span>
                        Join Telegram
                      </a>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <p style={{ fontSize: '1.2rem', marginBottom: '10px' }}>
                        Ready to join the XEND IT movement?
                      </p>
                      <p style={{ color: '#84cc16', fontWeight: 'bold', fontSize: '1.5rem' }}>
                        Let&apos;s XEND IT together! 🚀
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <style jsx global>{`
          @keyframes float {
            0%, 100% { 
              transform: translateY(0px); 
              opacity: 0.6;
            }
            50% { 
              transform: translateY(-20px); 
              opacity: 1;
            }
          }
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
        `}</style>
      </>
    )
  }

  // Default return (shouldn't reach here, but just in case)
  return null
}