import { Recycle, ShoppingBag, Award } from 'lucide-react'

const features = [
  {
    icon: Recycle,
    title: 'Track Your Materials',
    description: 'Easily log and monitor your recycling efforts. Get insights into your environmental impact over time.'
  },
  {
    icon: ShoppingBag,
    title: 'Join the Marketplace',
    description: 'Connect with companies looking for recyclable materials. Turn your waste into valuable resources.'
  },
  {
    icon: Award,
    title: 'Earn Rewards',
    description: 'Get rewarded for your recycling efforts. Earn points and badges as you contribute to a greener planet.'
  }
]

export default function KeyFeatures() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-green-800 mb-12">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <feature.icon className="w-16 h-16 mx-auto text-green-600 mb-4" />
              <h3 className="text-xl font-semibold text-green-700 mb-2">{feature.title}</h3>
              <p className="text-green-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

