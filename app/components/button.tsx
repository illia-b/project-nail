"use client"

const Button = ({ children, ...props }) => (
    <button {...props}
    className={
        'px-1 m-1 rounded ' + 
        'text-white font-bold ' + 
        'bg-blue-500  hover:bg-blue-300 disabled:bg-gray-500 ' + 
        props.className
    } >
            {children}
    </button>
);
export default Button;