import { Button } from '@/components/ui/button'

export default function JoinCommunity() {
  return (
    <section className="py-20 bg-green-100">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-green-800 mb-4">Join Our Growing Community</h2>
        <p className="text-xl text-green-700 mb-8">
          Be part of the solution. Start your recycling journey with Take Back today!
        </p>
        <Button className="bg-green-700 hover:bg-green-600 text-white text-lg py-2 px-6">
          Become a Member Today!
        </Button>
      </div>
    </section>
  )
}

