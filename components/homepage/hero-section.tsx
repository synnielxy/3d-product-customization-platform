import { ArrowRight, Github } from 'lucide-react';
import Link from "next/link";
import { BorderBeam } from "../magicui/border-beam";
import { Button } from "../ui/button";
import Image from 'next/image';
import { TITLE_TAILWIND_CLASS } from '@/utils/constants';

export default function HeroSection() {
    return (
        <section className='flex flex-col items-center justify-center leading-6 mt-[3rem]' aria-label="Nextjs Starter Kit Hero">
            <h1 className={`${TITLE_TAILWIND_CLASS} scroll-m-20 font-semibold tracking-tight text-center max-w-[1120px] bg-gradient-to-b dark:text-white`}>
                3D Product Customization Platform
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 text-center mt-2 dark:text-gray-400">
                Empower your customers to design, visualize, and personalize your products in real-time. With our cutting-edge 3D customization technology, you’ll enhance engagement, streamline decision-making, and boost conversions—all while delivering a truly interactive shopping experience.
            </p>
            <div className="flex justify-center items-center gap-3">
                <Link href="/dashboard" className="mt-5">
                    <Button className="animate-buttonheartbeat rounded-md bg-blue-600 hover:bg-blue-500 text-sm font-semibold text-white">
                        Get Started
                    </Button>
                </Link>
            </div>
        </section>
    )
}
