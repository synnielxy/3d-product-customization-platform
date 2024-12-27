
import NavBar from './navbar'

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar />
      <main className="flex w-screen h-screen flex-col items-center dark:bg-black bg-white">
        <div className="absolute z-[-99] pointer-events-none inset-0 flex items-center justify-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        {children}
      </main>
    </>
  )
}