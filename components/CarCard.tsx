"use client"

import {useEffect, useState} from 'react'
import Image from 'next/image'
import { CarProps } from '@/types';
import CustomButton from './CustomButton';
import { calculateCarRent, getCarImageUrl} from '@/utils';
import CarDetails from './CarDetails';


interface CarCardProps{
    car:CarProps;

}
const CarCard = ({car} : CarCardProps) => {
    const {Make_ID, Make_Name, Model_ID, Model_Name, Year, Engine, Body, Transmission, Fuel} = car;

    const carRent = calculateCarRent(String(Year), Engine, Body, Make_Name);

    const [isOpen, setIsOpen] = useState(false);

 const [imageUrl, setImageUrl] = useState<string>("");
 useEffect(() => {
    const prompt = `${Make_Name} ${Model_Name} ${Year} ${Body} ${Engine}`;
    getCarImageUrl(prompt).then(setImageUrl);
  }, [Make_Name, Model_Name, Year, Body, Engine]);

  return (
    <div className='car-card group'>
        <div className='car-card__content'>
            <h2 className='car-card__content-title'>
                {Make_Name} {Model_Name}
            </h2>
        </div>
        <p className='flex mt-6 text-[32px] font-extrabold'>
            <span className='self-start text-[14px] font-semibold'>
                 $
            </span>
            {carRent} 
            <span className='self-end text-[14px] font-medium'>
                  / day
            </span>
        </p>
            <div className='relative w-full h-40 my-3 object-contain'>
                
                <Image src="/por911.avif" alt={`${Make_Name} ${Model_Name}`} fill priority className='object-contain' />
                
                </div>    
        <div className='relative flex w-full mt-2'>
            <div className='flex group-hover:invisible w-full justify-between text-gray'>
                <div className='flex flex-col justify-center items-center gap-2'>
                    <Image src="/fuel-svgrepo-com.svg" width={20} height={20} alt='steering wheel' />
                <p className='text-[14px]'>
                    {Fuel}

                </p>
                </div>
                 <div className='flex flex-col justify-center items-center gap-2'>
                    <Image src="/motor.svg" width={20} height={20} alt='tire' />
                <p className='text-[14px]'>
                     {Engine.split("/")[1].trim().split(" ")[0]}
                </p>
                </div>
                 <div className='flex flex-col justify-center items-center gap-2'>
                    <Image src="/year.svg" width={20} height={20} alt='steering wheel' />
                <p className='text-[14px]'>
                    {Year} year

                </p>
                </div>
            </div>

            <div className='car-card__btn-container'>
                <CustomButton
                title='View More'
                containerStyles='w-full py-[16px] rounded-full bg-primary-blue'
                rightIcon='/right-arrow.svg'
                handleClick={() => setIsOpen(true)}
                />
            </div>
        </div>
        <CarDetails isOpen={isOpen} closeModal={() => setIsOpen(false)} car={car}
        
        />
    </div>
  )
}

export default CarCard