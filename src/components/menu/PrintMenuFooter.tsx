import React from 'react';

interface PrintMenuFooterProps {
  qrCodePath: string;
  qrCodeAlt: string;
}

export const PrintMenuFooter: React.FC<PrintMenuFooterProps> = ({ qrCodePath, qrCodeAlt }) => (
  <div
    style={{
      marginTop: 'auto', // Push to bottom of flex container
      marginBottom: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '0.87rem',
      color: '#666',
      paddingTop: '0.3rem',
      lineHeight: 1.22,
      flexShrink: 0, // Prevent shrinking
      minHeight: '0.5in', // Minimum height for QR code clearance
      gap: '0.75rem', // Space between QR code and text
      backgroundColor: 'white',
      position: 'relative',
      zIndex: 10,
    }}
    className="footer-print-bar"
  >
    <img
      src={qrCodePath}
      alt={qrCodeAlt}
      style={{
        width: '0.5in',
        height: '0.5in',
        flexShrink: 0,
        display: 'block',
        printColorAdjust: 'exact',
        WebkitPrintColorAdjust: 'exact',
      }}
    />
    <span
      style={{
        color: '#666',
        fontSize: '0.87rem',
        fontWeight: '500',
        whiteSpace: 'nowrap',
        printColorAdjust: 'exact',
        WebkitPrintColorAdjust: 'exact',
      }}
    >
      See menu photos online:{' '}
      <a
        href="https://tearekz.cafe/menu"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          color: '#444',
          textDecoration: 'underline',
          printColorAdjust: 'exact',
          WebkitPrintColorAdjust: 'exact',
        }}
      >
        tearekz.cafe/menu
      </a>
    </span>
  </div>
);
