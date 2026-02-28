import React from 'react';

export type AppId = 'financeiro' | 'ecommerce' | 'gestao' | 'agenda' | 'estoque' | 'automacao';

export interface Testimonial {
  id?: string | number;
  name: string;
  role: string;
  company: string;
  content: string;
  image: string;
  rating: number;
}

export interface ProblemNode {
  id: string;
  title: string;
  icon: React.ReactNode;
  position: { top?: string; left?: string; right?: string; bottom?: string };
  solutionApp: string;
  before: string[];
  after: string[];
}