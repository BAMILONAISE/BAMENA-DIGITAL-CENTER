import React from 'react'
import Navbar from '../components/Navbar'

// import motion  from "framer-motion"
// import { Button } from "@/components/ui/button"
// import { SiteHeader } from "@/components/site-header"
// import { SiteFooter } from "@/components/site-footer"
// import { FadeIn } from "@/components/animations/fade-in"
// import { StaggerChildren, StaggerItem } from "@/components/animations/stagger-children"
// import { CountUp } from "@/components/animations/count-up"


function About() {
 

 
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar/>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bamileke-pattern">
          <div className="container px-4 md:px-6">
            <FadeIn className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-bamileke-red">À Propos de Nous</h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Découvrez notre mission, notre vision et notre équipe dédiée à la formation numérique et à la
                  préservation culturelle.
                </p>
              </div>
            </FadeIn>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
              <FadeIn direction="right" className="space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-bamileke-red">Notre Mission</h2>
                  <p className="text-muted-foreground md:text-xl">
                    Le Bamena Digital Center a pour mission de promouvoir l'éducation numérique et de préserver la
                    langue NDA'A NDA'A au cœur du pays bamiléké.
                  </p>
                </div>
                <ul className="grid gap-4">
                  {[
                    "Offrir une formation de qualité en multimédia et développement web",
                    "Préserver et promouvoir la langue maternelle NDA'A NDA'A",
                    "Créer des opportunités d'emploi pour les jeunes de la région",
                    "Contribuer au développement numérique de la communauté",
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      className="flex items-start gap-2"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5 flex-shrink-0 text-bamileke-red"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
                <div className="pt-4">
                  <Link href="/contact">
                    <Button className="bg-bamileke-red hover:bg-bamileke-red/90">Contactez-nous</Button>
                  </Link>
                </div>
              </FadeIn>
              <FadeIn direction="left" className="flex items-center justify-center">
                <motion.div
                  className="overflow-hidden rounded-lg border-4 border-bamileke-red"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src="/images/bamena-landscape.png"
                    alt="Paysage de Bamena"
                    width={500}
                    height={300}
                    className="object-cover"
                  />
                </motion.div>
              </FadeIn>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-bamileke-red/5">
          <div className="container px-4 md:px-6">
            <FadeIn className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-bamileke-red">Notre Vision</h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Nous aspirons à créer un centre de formation multimédia de référence qui allie modernité et
                  préservation culturelle.
                </p>
              </div>
            </FadeIn>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
              {[
                {
                  title: "Centre de Formation",
                  description:
                    "Construire un centre de formation multimédia moderne équipé des dernières technologies pour offrir une formation de qualité.",
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-10 w-10 text-bamileke-red"
                    >
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                    </svg>
                  ),
                },
                {
                  title: "Préservation Linguistique",
                  description:
                    "Développer des outils numériques pour préserver et enseigner la langue NDA'A NDA'A aux nouvelles générations.",
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-10 w-10 text-bamileke-red"
                    >
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                  ),
                },
                {
                  title: "Développement Communautaire",
                  description:
                    "Contribuer au développement économique et social de la région en formant les jeunes aux métiers du numérique.",
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-10 w-10 text-bamileke-red"
                    >
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  ),
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center space-y-2 rounded-lg border border-bamileke-red/20 bg-white p-6 text-center shadow-sm"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="rounded-full bg-bamileke-red/10 p-4">{item.icon}</div>
                  <h3 className="text-xl font-bold text-bamileke-earth">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <FadeIn className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-bamileke-red">Notre Équipe</h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Rencontrez les personnes passionnées qui travaillent à la réalisation de notre mission.
                </p>
              </div>
            </FadeIn>
            <StaggerChildren className="mx-auto grid max-w-5xl gap-8 py-12 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  name: "Jean Kouam",
                  role: "Fondateur & Directeur",
                  bio: "Expert en développement web et multimédia avec plus de 10 ans d'expérience dans le domaine de la formation.",
                  image: "/images/bamileke-chief.png",
                },
                {
                  name: "Marie Nguiffo",
                  role: "Responsable Pédagogique",
                  bio: "Spécialiste en ingénierie pédagogique et en conception de programmes de formation adaptés aux besoins locaux.",
                  image: "/images/bamileke-mask.png",
                },
                {
                  name: "Paul Tagne",
                  role: "Expert Linguistique",
                  bio: "Linguiste spécialisé dans la langue NDA'A NDA'A et passionné par la préservation du patrimoine culturel bamiléké.",
                  image: "/images/bamileke-chief.png",
                },
                {
                  name: "Sophie Kamga",
                  role: "Responsable Marketing",
                  bio: "Experte en marketing digital avec une forte expérience dans la promotion de projets éducatifs et culturels.",
                  image: "/images/bamileke-mask.png",
                },
                {
                  name: "Robert Fotso",
                  role: "Développeur Web",
                  bio: "Développeur full-stack passionné par la création d'outils numériques pour l'éducation et la préservation culturelle.",
                  image: "/images/bamileke-chief.png",
                },
                {
                  name: "Claire Ngannou",
                  role: "Designer UX/UI",
                  bio: "Designer créative spécialisée dans la conception d'interfaces utilisateur intuitives et culturellement adaptées.",
                  image: "/images/bamileke-mask.png",
                },
              ].map((member, index) => (
                <StaggerItem key={index}>
                  <motion.div
                    className="flex flex-col items-center space-y-4 rounded-lg border border-bamileke-red/20 bg-white p-6 text-center shadow-sm"
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <div className="relative h-24 w-24 overflow-hidden rounded-full">
                      <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-bamileke-earth">{member.name}</h3>
                      <p className="text-sm font-medium text-bamileke-red">{member.role}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">{member.bio}</p>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerChildren>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-bamileke-red/5">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
              <FadeIn direction="right" className="space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-bamileke-red">Notre Histoire</h2>
                  <p className="text-muted-foreground md:text-xl">
                    Le Bamena Digital Center est né d'une vision commune de passionnés de technologie et de culture
                    bamiléké.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-bamileke-red/10 p-2">
                      <span className="text-bamileke-red font-bold">2020</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-bamileke-earth">Naissance de l'idée</h3>
                      <p className="text-sm text-muted-foreground">
                        L'idée du Bamena Digital Center est née lors d'une réunion entre passionnés de technologie et de
                        culture bamiléké.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-bamileke-red/10 p-2">
                      <span className="text-bamileke-red font-bold">2021</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-bamileke-earth">Études préliminaires</h3>
                      <p className="text-sm text-muted-foreground">
                        Réalisation d'études de faisabilité et élaboration du projet de centre de formation.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-bamileke-red/10 p-2">
                      <span className="text-bamileke-red font-bold">2022</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-bamileke-earth">Lancement des cours en ligne</h3>
                      <p className="text-sm text-muted-foreground">
                        Début des activités avec le lancement des premiers cours en ligne pour tester le concept.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-bamileke-red/10 p-2">
                      <span className="text-bamileke-red font-bold">2023</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-bamileke-earth">Recherche de financements</h3>
                      <p className="text-sm text-muted-foreground">
                        Début de la recherche de partenaires et de financements pour la construction du centre physique.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-bamileke-red/10 p-2">
                      <span className="text-bamileke-red font-bold">2024</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-bamileke-earth">Expansion des cours</h3>
                      <p className="text-sm text-muted-foreground">
                        Élargissement de l'offre de formation et développement de la plateforme en ligne.
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>
              <FadeIn direction="left" className="flex flex-col justify-center space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2 rounded-lg bg-white p-4 text-center shadow-sm">
                    <div className="text-3xl font-bold text-bamileke-red">
                      <CountUp end={1500} suffix="+" />
                    </div>
                    <p className="text-sm font-medium">Étudiants formés</p>
                  </div>
                  <div className="space-y-2 rounded-lg bg-white p-4 text-center shadow-sm">
                    <div className="text-3xl font-bold text-bamileke-red">
                      <CountUp end={25} />
                    </div>
                    <p className="text-sm font-medium">Cours disponibles</p>
                  </div>
                  <div className="space-y-2 rounded-lg bg-white p-4 text-center shadow-sm">
                    <div className="text-3xl font-bold text-bamileke-red">
                      <CountUp end={12} />
                    </div>
                    <p className="text-sm font-medium">Formateurs experts</p>
                  </div>
                  <div className="space-y-2 rounded-lg bg-white p-4 text-center shadow-sm">
                    <div className="text-3xl font-bold text-bamileke-red">
                      <CountUp end={5} />
                    </div>
                    <p className="text-sm font-medium">Partenaires</p>
                  </div>
                </div>
                <div className="rounded-lg bg-white p-6 shadow-sm">
                  <h3 className="mb-4 text-xl font-bold text-bamileke-earth">Notre Objectif pour 2025</h3>
                  <p className="text-muted-foreground">
                    Notre objectif est de commencer la construction du centre de formation physique à Bamena d'ici 2025,
                    avec le soutien de nos partenaires et de la communauté.
                  </p>
                  <div className="mt-4">
                    <Link href="/contact">
                      <Button className="w-full bg-bamileke-red hover:bg-bamileke-red/90">Soutenez notre projet</Button>
                    </Link>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <FadeIn className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-bamileke-red">Nos Partenaires</h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Nous collaborons avec des organisations qui partagent notre vision et soutiennent notre mission.
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-8 py-8">
                {[1, 2, 3, 4, 5].map((partner) => (
                  <div
                    key={partner}
                    className="flex h-24 w-40 items-center justify-center rounded-lg border border-bamileke-red/20 bg-white p-4"
                  >
                    <span className="text-xl font-bold text-muted-foreground">Partenaire {partner}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-bamileke-red/5">
          <div className="container px-4 md:px-6">
            <FadeIn className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-bamileke-red">Rejoignez-nous</h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Participez à notre mission de formation numérique et de préservation culturelle.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/courses">
                  <Button className="bg-bamileke-red hover:bg-bamileke-red/90">Découvrir nos cours</Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" className="border-bamileke-red text-bamileke-red hover:bg-bamileke-red/10">
                    Contactez-nous
                  </Button>
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}



  


export default About