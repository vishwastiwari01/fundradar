"use client";

import React from 'react';
import styled from 'styled-components';

export const WalletCard = () => {
  return (
    <StyledWrapper>
      <div className="app-container">
        <div className="wallet">
          <div className="wallet-back" />
          
          {/* Card 1: VC */}
          <div className="card stripe">
            <div className="card-inner">
              <div className="card-top">
                <span>Venture Capital</span>
                <div className="chip" />
              </div>
              <div className="card-bottom">
                <div className="card-info">
                  <span className="label">Focus</span><span className="value">Seed & Series A</span>
                </div>
                <div className="card-number-wrapper">
                  <span className="hidden-stars">**** VCs</span>
                  <span className="card-number">840 Active VCs</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Card 2: Grants */}
          <div className="card wise">
            <div className="card-inner">
              <div className="card-top">
                <span>Grants & Awards</span>
                <div className="chip" />
              </div>
              <div className="card-bottom">
                <div className="card-info">
                  <span className="label">Type</span><span className="value">Non-Dilutive</span>
                </div>
                <div className="card-number-wrapper">
                  <span className="hidden-stars">**** Grants</span>
                  <span className="card-number">340 Active Awards</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Card 3: Hackathons */}
          <div className="card paypal">
            <div className="card-inner">
              <div className="card-top">
                <span>Hackathons & Credits</span>
                <div className="chip" />
              </div>
              <div className="card-bottom">
                <div className="card-info">
                  <span className="label">Prizes</span><span className="value">Up to $200K / Cloud</span>
                </div>
                <div className="card-number-wrapper">
                  <span className="hidden-stars">**** Prizes</span>
                  <span className="card-number">120+ Hackathons</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="pocket">
            <svg className="pocket-svg" viewBox="0 0 280 160" fill="none">
              <path d="M 0 20 C 0 10, 5 10, 10 10 C 20 10, 25 25, 40 25 L 240 25 C 255 25, 260 10, 270 10 C 275 10, 280 10, 280 20 L 280 120 C 280 155, 260 160, 240 160 L 40 160 C 20 160, 0 155, 0 120 Z" fill="#18181c" />
              <path d="M 8 22 C 8 16, 12 16, 15 16 C 23 16, 27 29, 40 29 L 240 29 C 253 29, 257 16, 265 16 C 268 16, 272 16, 272 22 L 272 120 C 272 150, 255 152, 240 152 L 40 152 C 25 152, 8 152, 8 120 Z" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" strokeDasharray="6 4" />
            </svg>
            <div className="pocket-content">
              <div style={{position: 'relative', height: 28, width: '100%'}}>
                <div className="balance-stars">******</div>
                <div className="balance-real">$4.2 Billion</div>
              </div>
              <div style={{color: 'rgba(255,255,255,0.4)', fontSize: 11, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase'}}>
                Total Capital Indexed
              </div>
              <div className="eye-icon-wrapper">
                <svg className="eye-icon eye-slash" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx={12} cy={12} r={3} />
                  <line x1={3} y1={3} x2={21} y2={21} />
                </svg>
                <svg className="eye-icon eye-open" style={{opacity: 0}} width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx={12} cy={12} r={3} />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  /* Wallet Wrapper */
  .app-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  .wallet {
    position: relative;
    width: 280px;
    height: 230px;
    cursor: pointer;
    perspective: 1000px;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    transition: transform 0.4s ease;
  }
  .wallet::after {
    content: "Hover to reveal funding";
    position: absolute;
    bottom: -32px;
    font-style: italic;
    color: #ff6b9d;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.02em;
    opacity: 0.7;
    transition: opacity 0.3s;
  }
  .wallet:hover::after {
    opacity: 0;
  }
  /* entry animation for card as page loads */
  @keyframes slideIntoPocket {
    0% {
      transform: translateY(-100px);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
  /* this is wallet back */
  .wallet-back {
    position: absolute;
    bottom: 0;
    width: 280px;
    height: 200px;
    background: #111114;
    border: 1px solid rgba(255,255,255,0.05);
    border-radius: 22px 22px 60px 60px;
    z-index: 5;
    box-shadow:
      inset 0 25px 35px rgba(0, 0, 0, 0.4),
      inset 0 5px 15px rgba(0, 0, 0, 0.5);
  }
  /* Cards things */
  .card {
    position: absolute;
    width: 260px;
    height: 140px;
    left: 10px;
    border-radius: 16px;
    padding: 16px;
    color: white;
    box-shadow:
      inset 0 1px 1px rgba(255, 255, 255, 0.15),
      0 -4px 15px rgba(0, 0, 0, 0.3);
    transition:
      transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1),
      z-index 0s;
    animation: slideIntoPocket 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) backwards;
  }
  .card-inner {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }
  .card-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }
  .chip {
    width: 32px;
    height: 24px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
    border: 1px solid rgba(255, 255, 255, 0.05);
  }
  .card-bottom {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
  .label {
    font-size: 8px;
    opacity: 0.5;
    text-transform: uppercase;
    margin-bottom: 2px;
    display: block;
  }
  .value {
    font-size: 10px;
    font-weight: 600;
  }
  .card-number-wrapper {
    text-align: right;
  }
  .hidden-stars {
    font-size: 13px;
    font-weight: 600;
  }
  .card-number {
    display: none;
    font-size: 11px;
    font-weight: 700;
    font-family: monospace;
  }
  /* card variants */
  .stripe {
    background: linear-gradient(135deg, #4f46e5 0%, #312e81 100%);
    bottom: 90px;
    z-index: 10;
    animation-delay: 0.1s;
    border: 1px solid rgba(255,255,255,0.05);
  }
  .wise {
    background: linear-gradient(135deg, #10b981 0%, #064e3b 100%);
    bottom: 65px;
    z-index: 20;
    animation-delay: 0.2s;
    border: 1px solid rgba(255,255,255,0.05);
  }
  .paypal {
    background: linear-gradient(135deg, #f59e0b 0%, #78350f 100%);
    bottom: 40px;
    z-index: 30;
    animation-delay: 0.3s;
    border: 1px solid rgba(255,255,255,0.05);
  }
  
  /* Pocket */
  .pocket {
    position: absolute;
    bottom: 0;
    width: 280px;
    height: 160px;
    z-index: 40;
    filter: drop-shadow(0 15px 25px rgba(0, 0, 0, 0.6));
  }
  .pocket-content {
    position: absolute;
    top: 45px;
    width: 100%;
    text-align: center;
    z-index: 50;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
  }
  .balance-stars {
    color: var(--text3);
    font-size: 24px;
    letter-spacing: 4px;
    transition: 0.3s;
    line-height: 1;
  }
  .balance-real {
    color: #c8f135;
    font-size: 20px;
    font-weight: 800;
    opacity: 0;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, 10px);
    transition: 0.3s;
    white-space: nowrap;
    text-shadow: 0 0 10px rgba(200, 241, 53, 0.3);
  }
  /* eye Logic */
  .eye-icon-wrapper {
    margin-top: 4px;
    height: 20px;
    width: 20px;
    position: relative;
    opacity: 0.4;
    transition: 0.3s;
  }
  .eye-icon {
    position: absolute;
    top: 0;
    left: 0;
    stroke: #ff6b9d;
    transition: 0.3s;
  }
  /* hovers works here */
  .wallet:hover {
    transform: translateY(-5px);
  }
  .wallet:hover .eye-icon-wrapper {
    opacity: 1;
  }
  /* hover effects on cards */
  .wallet:hover .stripe {
    transform: translateY(-75px) rotate(-3deg);
  }
  .wallet:hover .wise {
    transform: translateY(-45px) rotate(2deg);
  }
  .wallet:hover .paypal {
    transform: translateY(-10px);
  }
  /* indi card hover */
  .card:hover {
    z-index: 100 !important;
    transition-delay: 0s !important;
  }
  .wallet:hover .stripe:hover {
    transform: translateY(-85px) scale(1.03) rotate(0);
  }
  .wallet:hover .wise:hover {
    transform: translateY(-85px) scale(1.03) rotate(0);
  }
  .wallet:hover .paypal:hover {
    transform: translateY(-85px) scale(1.03) rotate(0);
  }
  .card:hover .hidden-stars {
    display: none;
  }
  .card:hover .card-number {
    display: block;
  }
  .wallet:hover .balance-stars {
    opacity: 0;
  }
  .wallet:hover .balance-real {
    opacity: 1;
    transform: translate(-50%, 0);
  }
  .wallet:hover .eye-slash {
    opacity: 0;
    transform: scale(0.5);
  }
  .wallet:hover .eye-open {
    opacity: 1;
    transform: scale(1.1);
  }
`;
