import Image from 'next/image'

const testimonials = [
  {
    quote: "Take Back has revolutionized how we handle our recyclables. It's user-friendly and impactful!",
    name: "Sarah Johnson",
    role: "Eco-Enthusiast",
    image: "/placeholder.svg?height=64&width=64"
  },
  {
    quote: "As a business owner, Take Back has helped us connect with eco-conscious consumers easily.",
    name: "Michael Chen",
    role: "Green Business Owner",
    image: "/placeholder.svg?height=64&width=64"
  }
]

export default function Testimonials() {
  return (
    <section className="py-20 bg-green-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-green-800 mb-12">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-green-700 mb-4">"{testimonial.quote}"</p>
              <div className="flex items-center">
                <Image
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  width={64}
                  height={64}
                  className="rounded-full mr-4"
                />
                <div>
                  <p className="font-semibold text-green-800">{testimonial.name}</p>
                  <p className="text-green-600">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

