import { type ComponentType } from 'react';
import { IntroductionPage, InstallationPage } from './Intro';
import { FoundationsPage, ThemingPage } from './Foundations';
import { AtomsPage, FormsPage, ContainersPage, OverlaysPage, ChartsPage } from './Components';
import { ShowcaseHomePage } from '../showcase/ShowcaseHome';
import { HeroApp } from '../showcase/Hero';
import { DashboardApp } from '../showcase/Dashboard';
import { FinanceApp } from '../showcase/Finance';
import { BankHomeApp } from '../showcase/BankHome';
import { CrmApp } from '../showcase/Crm';
import { EducationApp } from '../showcase/Education';

/** Route-id → page component. Keys match the ids in nav.ts. */
export const pages: Record<string, ComponentType> = {
  introduction: IntroductionPage,
  installation: InstallationPage,
  foundations: FoundationsPage,
  theming: ThemingPage,
  atoms: AtomsPage,
  forms: FormsPage,
  containers: ContainersPage,
  overlays: OverlaysPage,
  charts: ChartsPage,
  showcase: ShowcaseHomePage,
  hero: HeroApp,
  dashboard: DashboardApp,
  finance: FinanceApp,
  bank: BankHomeApp,
  crm: CrmApp,
  education: EducationApp,
};
