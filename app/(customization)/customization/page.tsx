"use client"

import PageWrapper from "@/components/wrapper/page-wrapper";
import { UI } from "@/components/homepage/UI";
import { Experience } from "@/components/canvas/Experience";
import { Leva } from "leva";

export default function CustomizationPage() {

    return (
        <PageWrapper>
            <Leva hidden={true} />
            <div className='w-full relative mt-14'>
                <Experience />
            </div>
            <UI />
        </PageWrapper>
    )
}
