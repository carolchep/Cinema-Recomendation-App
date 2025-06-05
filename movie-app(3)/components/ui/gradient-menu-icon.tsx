interface GradientMenuIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export function GradientMenuIcon({ className, ...props }: GradientMenuIconProps) {
  return (
    <svg 
      width="36" 
      height="36" 
      viewBox="0 0 36 36" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <circle cx="18" cy="18" r="18" fill="url(#paint0_linear_2030_38)"/>
      <rect width="24" height="24" transform="translate(6 6)" fill="url(#paint1_linear_2030_38)"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M9.6001 14.4C9.6001 13.7372 10.1374 13.2 10.8001 13.2H25.2001C25.8629 13.2 26.4001 13.7372 26.4001 14.4C26.4001 15.0627 25.8629 15.6 25.2001 15.6H10.8001C10.1374 15.6 9.6001 15.0627 9.6001 14.4Z" fill="white"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M9.6001 21.6C9.6001 20.9372 10.1374 20.4 10.8001 20.4H25.2001C25.8629 20.4 26.4001 20.9372 26.4001 21.6C26.4001 22.2627 25.8629 22.8 25.2001 22.8H10.8001C10.1374 22.8 9.6001 22.2627 9.6001 21.6Z" fill="white"/>
      <defs>
        <linearGradient id="paint0_linear_2030_38" x1="18.6575" y1="-9.10456e-09" x2="17.3425" y2="36" gradientUnits="userSpaceOnUse">
          <stop stopColor="#19A1BE"/>
          <stop offset="1" stopColor="#7D4192"/>
        </linearGradient>
        <linearGradient id="paint1_linear_2030_38" x1="12.4384" y1="-6.0697e-09" x2="11.5617" y2="24" gradientUnits="userSpaceOnUse">
          <stop stopColor="#19A1BE"/>
          <stop offset="1" stopColor="#7D4192"/>
        </linearGradient>
      </defs>
    </svg>
  )
} 