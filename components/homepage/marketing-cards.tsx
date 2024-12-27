"use client"
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useConfiguratorStore } from '@/store/store'
import { useRouter } from 'next/navigation'

const ProjectsData = [
  {
    id: 1,
    name: 'Christmas Tree',
    category: 'tree',
    description: 'Customize your Christmas tree with a variety of colors and styles.',
    image: 'https://afzwuzprhspnukdlhwif.supabase.co/storage/v1/object/public/web/category_images/tree.png?t=2024-12-27T05%3A00%3A20.020Z',
  },
  {
    id: 2,
    name: 'Cup',
    category: 'cup',
    description: 'A cup with a custom design.',
    image: 'https://afzwuzprhspnukdlhwif.supabase.co/storage/v1/object/public/web/category_images/mug.png',
  }
]

const SpringAnimatedFeatures = () => {
  const { setCategory } = useConfiguratorStore()
  const router = useRouter()

  const handleProjectClick = (project: typeof ProjectsData[0]) => {
    if (project.category === 'cup') {
      alert('Coming soon!')
      return
    }
    setCategory(project.category)
    router.push('/customization')
  }

  return (
    <div className="flex flex-col justify-center items-center lg:w-[75%]">
      <div className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {ProjectsData.map((project) => {
          return (
            <motion.div
              whileHover={{
                y: -8,
              }}
              transition={{
                type: 'spring',
                bounce: 0.7,
              }}
              key={project.id}
              className="mt-5 text-left border p-6 rounded-md dark:bg-black cursor-pointer"
              onClick={() => handleProjectClick(project)}
            >
              <div>
                <Image
                  src={project.image}
                  width={300}
                  height={300}
                  className="mb-3 rounded w-full h-[290px] object-cover"
                  alt={project.name}
                />
                <div className="mb-1 text-sm font-medium ">
                  {project.name}
                </div>
                <div className="max-w-[250px] text-sm font-normal text-gray-600 dark:text-gray-400">
                  {project.description}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default SpringAnimatedFeatures
