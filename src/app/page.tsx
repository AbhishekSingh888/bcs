import FAQModern from '@/components/Home/FAQs'
import Hero from '@/components/Home/Hero'
import Services from '@/components/Home/Services'
import TestimonialModern from '@/components/Home/Testimonial'

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Hero />
      <Services />
      <TestimonialModern />
      <FAQModern />
    </main>
  )
}
