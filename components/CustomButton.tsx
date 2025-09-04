"use client";

import { CustomButtonProps } from '@/types';
import Image from 'next/image';

const CustomButton = ({title,containerStyles,handleClick, btnType, rightIcon,textStyles}: CustomButtonProps) => {
  return (
<button
    disabled={false}
    type={btnType ||"button"}
    className={`bg-primary-blue text-white font-bold py-2 px-4 rounded ${containerStyles}`}
    onClick = {handleClick}
    >
<span className = {'flex-1 ${textStyles}'} >
{title}
</span>
<div className='relative w-full flex items-center'>
{rightIcon && (
  <div className='absolute  bottom-0.5 right-3 w-6 h-6'>
    <Image 
    src={rightIcon} 
    alt='right icon' 
    fill 
    className='object-contain'/>
  </div>
)}
</div>
</button>
)
}

export default CustomButton;