'use client';

import Link from 'next/link';
import { Button } from './ui/button';
import {
  TruckIcon,
  CheckCircleIcon,
  GlobeIcon,
  CalculatorIcon,
  ShieldCheckIcon,
  ChartLineIcon,
  MessageSquareIcon,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { DigitalAgentsSection } from './digital-agents-section';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { translate, type SupportedLanguage } from '@/lib/i18n';
import { LanguageSwitcher } from './language-switcher';

const features = [
  {
    icon: TruckIcon,
    titleKey: 'feature.rtq.title',
    descKey: 'feature.rtq.desc',
  },
  {
    icon: GlobeIcon,
    titleKey: 'feature.global.title',
    descKey: 'feature.global.desc',
  },
  {
    icon: CalculatorIcon,
    titleKey: 'feature.calc.title',
    descKey: 'feature.calc.desc',
  },
  {
    icon: ShieldCheckIcon,
    titleKey: 'feature.compliance.title',
    descKey: 'feature.compliance.desc',
  },
  {
    icon: MessageSquareIcon,
    titleKey: 'feature.team.title',
    descKey: 'feature.team.desc',
  },
  {
    icon: ChartLineIcon,
    titleKey: 'feature.exp.title',
    descKey: 'feature.exp.desc',
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const staggerChildren = {
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export function LandingPage() {
  const [language, setLanguage] = useState<SupportedLanguage>('en');

  useEffect(() => {
    // Detect language from browser or URL
    const cookie = document.cookie
      .split('; ')
      .find((c) => c.startsWith('lang='));
    if (cookie) {
      const value = cookie.split('=')[1] as SupportedLanguage;
      if (value === 'en' || value === 'tr') setLanguage(value);
    } else {
      const browserLang = navigator.language.toLowerCase();
      const isTurkish = browserLang.includes('tr');
      setLanguage(isTurkish ? 'tr' : 'en');
    }
  }, []);

  const scrollToAgents = () => {
    const agentsSection = document.getElementById('digital-agents');
    if (agentsSection) {
      agentsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 safe-area-inset-top">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex h-16 sm:h-16 items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <Image
                src="/images/dexpell-logo.jpg"
                alt="Dexpell Logo"
                width={32}
                height={32}
                className="rounded-lg sm:size-10"
              />
              <span className="text-lg sm:text-xl font-bold">
                {translate(language, 'nav.brand')}
              </span>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <LanguageSwitcher />
              <Link href="/login">
                <Button variant="ghost" size="sm" className="text-sm">
                  {translate(language, 'nav.login')}
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm" className="text-sm">
                  {translate(language, 'nav.getStarted')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.section
        className="container mx-auto px-4 py-12 sm:py-16 lg:py-20 xl:py-32"
        initial="hidden"
        animate="visible"
        variants={staggerChildren}
      >
        <div className="mx-auto max-w-4xl text-center">
          <motion.h1
            className="mb-4 sm:mb-6 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight"
            variants={fadeInUp}
          >
            {translate(language, 'hero.title.prefix')}{' '}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {translate(language, 'hero.title.highlight')}
            </span>
          </motion.h1>
          <motion.p
            className="mb-8 sm:mb-10 text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed"
            variants={fadeInUp}
          >
            {translate(language, 'hero.subtitle')}
          </motion.p>

          {/* Feature Badges - 2x2 Grid */}
          <motion.div
            className="mb-8 sm:mb-10 grid grid-cols-2 gap-3 max-w-2xl mx-auto"
            variants={fadeInUp}
          >
            {(() => {
              const badges = translate(language, 'hero.badges');
              const badgesArray = Array.isArray(badges) ? badges : [
                language === 'tr' ? 'Gerçek ekip tonu & uzmanlığı' : 'Real team tone & expertise',
                language === 'tr' ? 'Politika ve onay akışlarına uyum' : 'Policy and approval flow compliance',
                language === 'tr' ? 'WhatsApp • Web • E-posta' : 'WhatsApp • Web • Email',
                language === 'tr' ? 'Navlun & transit & toplam maliyet' : 'Freight & transit & total cost'
              ];
              
              return badgesArray.map((badge, index) => (
                <div 
                  key={index}
                  className="px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-center text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  {badge}
                </div>
              ));
            })()}
          </motion.div>

          <motion.div
            className="mb-12 sm:mb-16 rounded-2xl bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-6 sm:p-8 lg:p-10 border border-primary/10 ring-1 ring-primary/5"
            variants={fadeInUp}
          >
            <p className="mb-3 sm:mb-4 text-base sm:text-lg font-semibold">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Dexpell.ai
              </span>{' '}
              {translate(language, 'hero.explainer')}
            </p>
            <p className="mb-4 sm:mb-6 text-sm sm:text-base text-muted-foreground leading-relaxed">
              {translate(language, 'hero.explainer2')}
            </p>
            <div className="flex flex-col gap-3 sm:gap-4 sm:flex-row sm:justify-center">
              <Link href="/chat">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  {translate(language, 'hero.cta.quote')}
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-2 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground font-semibold transition-all"
                onClick={scrollToAgents}
              >
                {translate(language, 'hero.cta.team')}
              </Button>
            </div>
          </motion.div>

          <motion.p
            className="text-lg sm:text-xl lg:text-2xl font-semibold"
            variants={fadeInUp}
          >
            {translate(language, 'hero.tagline.prefix')}{' '}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {translate(language, 'hero.tagline.suffix')}
            </span>
          </motion.p>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        className="container mx-auto px-4 py-12 sm:py-16 lg:py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerChildren}
      >
        <motion.div className="mb-8 sm:mb-12 text-center" variants={fadeInUp}>
          <h2 className="mb-4 text-2xl sm:text-3xl lg:text-4xl font-bold">
            {translate(language, 'features.heading.prefix')}{' '}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {translate(language, 'features.heading.highlight')}
            </span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            {translate(language, 'features.subheading')}
          </p>
        </motion.div>

        <div className="grid gap-4 sm:gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={feature.titleKey}
                className="group relative overflow-hidden rounded-2xl border-2 border-primary/10 bg-gradient-to-br from-background via-background to-primary/5 p-4 sm:p-6 md:p-8 transition-all duration-300 hover:shadow-2xl hover:border-primary/20 hover:-translate-y-1"
                variants={fadeInUp}
                whileHover={{ y: -5 }}
              >
                <div
                  className={`mb-4 sm:mb-6 inline-flex size-12 sm:size-14 items-center justify-center rounded-xl ${isEven ? 'bg-gradient-to-br from-primary/10 to-primary/20 text-primary' : 'bg-gradient-to-br from-secondary/10 to-secondary/20 text-secondary'} ring-2 ring-current/10`}
                >
                  <Icon className="size-6 sm:size-7" />
                </div>
                <h3 className="mb-3 text-lg sm:text-xl font-bold">
                  {translate(language, feature.titleKey)}
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {translate(language, feature.descKey)}
                </p>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* Benefits Section */}
      <motion.section
        className="bg-muted py-12 sm:py-16 lg:py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerChildren}
      >
        <div className="container mx-auto px-4">
          <motion.div className="mb-8 sm:mb-12 text-center" variants={fadeInUp}>
            <h2 className="mb-4 text-2xl sm:text-3xl lg:text-4xl font-bold">
              {translate(language, 'benefits.heading')}
            </h2>
          </motion.div>

          <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
            <motion.div className="space-y-3 sm:space-y-4" variants={fadeInUp}>
              {[
                {
                  icon: CheckCircleIcon,
                  text: translate(language, 'benefits.b1'),
                },
                {
                  icon: CheckCircleIcon,
                  text: translate(language, 'benefits.b2'),
                },
                {
                  icon: CheckCircleIcon,
                  text: translate(language, 'benefits.b3'),
                },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3">
                  <item.icon className="size-5 sm:size-6 text-green-500 shrink-0" />
                  <span className="text-sm sm:text-base lg:text-lg">
                    {item.text}
                  </span>
                </div>
              ))}
            </motion.div>

            <motion.div className="space-y-3 sm:space-y-4" variants={fadeInUp}>
              {[
                {
                  icon: CheckCircleIcon,
                  text: translate(language, 'benefits.b4'),
                },
                {
                  icon: CheckCircleIcon,
                  text: translate(language, 'benefits.b5'),
                },
                {
                  icon: CheckCircleIcon,
                  text: translate(language, 'benefits.b6'),
                },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3">
                  <item.icon className="size-5 sm:size-6 text-green-500 shrink-0" />
                  <span className="text-sm sm:text-base lg:text-lg">
                    {item.text}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Digital Agents Section */}
      <DigitalAgentsSection language={language} />

      {/* About Us Section */}
      <motion.section
        id="about-us"
        className="bg-gradient-to-br from-muted/30 via-background to-muted/30 py-12 sm:py-16 lg:py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerChildren}
      >
        <div className="container mx-auto px-4">
          <motion.div className="mb-8 sm:mb-12 text-center" variants={fadeInUp}>
            <h2 className="mb-4 text-2xl sm:text-3xl lg:text-4xl font-bold">
              {translate(language, 'about.heading.prefix')}{' '}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {translate(language, 'about.heading.highlight')}
              </span>
            </h2>
          </motion.div>

          <div className="flex justify-center">
            {language === 'tr' ? (
              <motion.div
                className="max-w-4xl space-y-4 sm:space-y-6"
                variants={fadeInUp}
              >
                <div className="space-y-6 text-muted-foreground leading-relaxed text-base sm:text-lg text-center">
                  <p className="text-lg sm:text-xl">
                    {translate(language, 'about.p1')}
                  </p>
                  <p>{translate(language, 'about.p2')}</p>
                  <p>{translate(language, 'about.p3')}</p>
                  <p>{translate(language, 'about.p4')}</p>
                  <p className="font-bold text-xl sm:text-2xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    {translate(language, 'about.p5')}
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                className="max-w-4xl space-y-4 sm:space-y-6"
                variants={fadeInUp}
              >
                <div className="space-y-6 text-muted-foreground leading-relaxed text-base sm:text-lg text-center">
                  <p className="text-lg sm:text-xl">
                    {translate(language, 'about.p1')}
                  </p>
                  <p>{translate(language, 'about.p2')}</p>
                  <p>{translate(language, 'about.p3')}</p>
                  <p>{translate(language, 'about.p4')}</p>
                  <p className="font-bold text-xl sm:text-2xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    {translate(language, 'about.p5')}
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="container mx-auto px-4 py-12 sm:py-16 lg:py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div className="mx-auto max-w-2xl rounded-3xl bg-gradient-to-br from-primary via-primary to-secondary p-8 sm:p-10 lg:p-12 text-center text-primary-foreground shadow-2xl ring-1 ring-white/20">
          <h2 className="mb-3 sm:mb-4 text-2xl sm:text-3xl font-bold">
            {translate(language, 'cta.title')}
          </h2>
          <p className="mb-6 sm:mb-8 text-base sm:text-lg opacity-90 leading-relaxed">
            {translate(language, 'cta.subtitle')}
          </p>
          <div className="flex flex-col gap-3 sm:gap-4 sm:flex-row sm:justify-center">
            <Link href="/chat">
              <Button
                size="lg"
                variant="secondary"
                className="w-full sm:w-auto bg-white text-primary hover:bg-white/90 font-semibold shadow-lg"
              >
                {translate(language, 'cta.try')}
              </Button>
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="border-t bg-muted/50 py-8 sm:py-12 safe-area-inset-bottom">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid gap-6 sm:gap-8 md:grid-cols-4">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <Image
                  src="/images/dexpell-logo.jpg"
                  alt="Dexpell Logo"
                  width={24}
                  height={24}
                  className="rounded"
                />
                <span className="text-lg sm:text-xl font-bold">
                  {translate(language, 'nav.brand')}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {translate(language, 'footer.tagline')}
              </p>
            </div>
            <div>
              <h4 className="mb-4 font-semibold">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/chat" className="hover:text-primary">
                    {translate(language, 'nav.instantQuotes')}
                  </Link>
                </li>

                <li>
                  <Link href="#" className="hover:text-primary">
                    {translate(language, 'nav.apiAccess')}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-semibold">
                {translate(language, 'nav.company')}
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#about-us" className="hover:text-primary">
                    {translate(language, 'nav.aboutUs')}
                  </Link>
                </li>
                <li>
                  <Link href="https://dexpell.com" className="hover:text-primary">
                    {translate(language, 'nav.contact')}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-semibold">
                {translate(language, 'nav.connect')}
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-primary">
                    {translate(language, 'nav.whatsapp')}
                  </Link>
                </li>
                <li>
                  <Link href="https://www.linkedin.com/company/dexpelllogistics/" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                    {translate(language, 'nav.linkedin')}
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary">
                    {translate(language, 'nav.support')}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
            {translate(language, 'footer.copyright')}
          </div>
        </div>
      </footer>
    </div>
  );
}