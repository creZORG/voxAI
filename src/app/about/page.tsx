import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import Image from 'next/image';

const team = [
  {
    name: 'Andrew Kariuki',
    role: 'Founder & CEO',
    description: 'Software Engineer & AI Enthusiast',
    imageUrl: 'https://i0.wp.com/ai-global-dynamics.com/wp-content/uploads/2025/09/467703341_10162159028859490_4715640979547421501_n.jpg?resize=150%2C150&ssl=1',
  },
  {
    name: 'Alex Waigwa',
    role: 'Managing Director',
    description: 'AI Expert',
    imageUrl: 'https://i0.wp.com/ai-global-dynamics.com/wp-content/uploads/2025/09/WhatsApp-Image-2025-09-12-at-10.38.30-AM.jpeg?resize=241%2C300&ssl=1',
  },
];

const values = [
    {
      title: "Human in the Loop",
      description: "Automation reduces repetitive work. People remain the decision makers. Our systems collaborate with your team and strengthen their impact."
    },
    {
      title: "Transparency and Control",
      description: "You own your data, your logic and your workflows. We ensure every automation is understandable, adjustable and fully under your control."
    },
    {
      title: "Fast Time to Value",
      description: "We believe results should arrive quickly. We deliver prototypes and pilot systems that show measurable ROI in weeks."
    },
    {
      title: "Scalable and Secure",
      description: "Every solution is built with a modern, cloud ready foundation backed by strong monitoring, security and fail safe mechanisms."
    },
    {
      title: "Continuous Evolution",
      description: "Automation is not a one time installation. It is a living system. We partner with you long term so your AI improves as your business evolves."
    }
]

const process = [
    {
        title: "Deep Discovery",
        description: "We interview teams, map workflows, analyze pain points and identify the automation opportunities with the highest return."
    },
    {
        title: "Pilot and Prototype",
        description: "Instead of long planning cycles, we build a working pilot so you can test the impact directly in your real processes."
    },
    {
        title: "Iterative Integration",
        description: "After validation, we refine the system, integrate it with your live tools such as CRMs, fulfillment systems or internal applications, and set up smart alerts and feedback loops."
    },
    {
        title: "Deployment and Monitoring",
        description: "We deploy to production with full performance tracking, quality checks and exception handling. We train your team to manage, improve and scale the automation."
    },
    {
        title: "Continuous Optimization",
        description: "As your operations grow, your automations grow with you. We provide ongoing improvements, model updates and new features to ensure long term success and resilience."
    }
]


export default function AboutPage() {
  return (
    <div className="bg-background text-foreground">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        
        <section className="text-center mb-24">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-600">
            About Vox AI
          </h1>
          <p className="max-w-3xl mx-auto text-lg sm:text-xl text-muted-foreground leading-relaxed">
            At Vox AI, we believe automation should elevate people, not replace them. Our mission is to turn everyday business workflows into intelligent, adaptive systems that free teams to focus on strategy, creativity and innovation. We design AI that feels like a partner. Helpful. Reliable. Built to empower your workforce.
          </p>
        </section>

        <section className="mb-24">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">Who We Are</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                <div className="space-y-4 text-muted-foreground">
                    <p>We are a team of AI engineers, automation designers and operational specialists who understand how real businesses run. Our backgrounds span machine learning, systems integration and large scale enterprise operations.</p>
                    <p>What makes us different is our human centered approach. We do not deliver black box systems. We build transparent, maintainable AI tools that your team can understand, trust and improve. Technology should feel like an upgrade to your people, not a replacement.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {team.map((member) => (
                    <Card key={member.name} className="p-6 text-center border-border hover:border-primary transition-colors">
                        <div className="relative w-24 h-24 mx-auto mb-4">
                            <Image
                                src={member.imageUrl}
                                alt={member.name}
                                layout="fill"
                                objectFit="cover"
                                className="rounded-full"
                            />
                        </div>
                        <h3 className="font-bold text-lg text-foreground">{member.name}</h3>
                        <p className="text-primary font-medium">{member.role}</p>
                        <p className="text-sm text-muted-foreground mt-1">{member.description}</p>
                    </Card>
                ))}
                </div>
            </div>
        </section>

        <section className="mb-24">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.slice(0, 3).map((value) => (
              <div key={value.title} className="bg-card p-6 rounded-lg border border-border">
                <h3 className="font-bold text-xl mb-2 text-primary">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
             {values.slice(3).map((value) => (
              <div key={value.title} className="bg-card p-6 rounded-lg border border-border">
                <h3 className="font-bold text-xl mb-2 text-primary">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </div>
            ))}
           </div>
        </section>

        <section>
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">How We Work</h2>
            <div className="relative">
                <div className="absolute left-1/2 -translate-x-1/2 w-px h-full bg-border" aria-hidden="true"></div>
                {process.map((step, index) => (
                    <div key={step.title} className="relative flex items-center mb-12 group">
                        <div className={`w-1/2 pr-8 text-right ${index % 2 === 1 ? 'order-1' : ''}`}>
                            <h3 className="font-bold text-2xl mb-2 text-primary">{step.title}</h3>
                            <p className="text-muted-foreground">{step.description}</p>
                        </div>
                        <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background box-content"></div>
                        <div className="w-1/2"></div>
                    </div>
                ))}
            </div>
        </section>
      </div>
    </div>
  );
}
