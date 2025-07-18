import React from 'react';

import BookStudy from '../assets/calendar/book-study.svg';
import ServiceCharity from '../assets/calendar/service-charity.svg';
import SpiritualPractice from '../assets/calendar/spiritual&practice.svg';
import TempleCommunity from '../assets/calendar/temple-community.svg';
import Other from '../assets/task-creation/other.svg';

export enum TypeOfTask {
  MEDITATION = 'Daily Meditation',
  PRAYER = 'Prayer & Chanting',
  CHARITY = 'Charitable Giving',
  SERVICE = 'Community Service',
  STUDY = 'Scripture Study',
  TEMPLE = 'Temple Visit',
  SEVA = 'Seva Activities',
  FASTING = 'Fasting',
  KIRTAN = 'Kirtan & Devotional Music',
  OTHER = 'Other'
}

export enum Category {
  ALL = '',
  SPIRITUAL = 'Spiritual Practice',
  SERVICE = 'Service & Charity',
  COMMUNITY = 'Community & Temple',
  STUDY = 'Study & Learning',
  OTHER = 'Other'
}

export enum Status {
  INCOMPLETE = 'INCOMPLETE',
  COMPLETE = 'COMPLETE',
  INPROGRESS = 'INPROGRESS',
  OVERDUE = 'OVERDUE',
  TODO = 'TODO'
}

export const TypeToCategoryMap: Record<string, Category> = {
  meditation: Category.SPIRITUAL,
  prayer: Category.SPIRITUAL,
  fasting: Category.SPIRITUAL,
  charity: Category.SERVICE,
  service: Category.SERVICE,
  seva: Category.SERVICE,
  temple: Category.COMMUNITY,
  kirtan: Category.COMMUNITY,
  study: Category.STUDY,
  other: Category.OTHER
};

export const CategoryToTypeMap: Record<Category, TypeOfTask[]> = {
  [Category.ALL]: [],
  [Category.SPIRITUAL]: [
    TypeOfTask.MEDITATION,
    TypeOfTask.PRAYER,
    TypeOfTask.FASTING
  ],
  [Category.SERVICE]: [TypeOfTask.CHARITY, TypeOfTask.SERVICE, TypeOfTask.SEVA],
  [Category.COMMUNITY]: [TypeOfTask.TEMPLE, TypeOfTask.KIRTAN],
  [Category.STUDY]: [TypeOfTask.STUDY],
  [Category.OTHER]: [TypeOfTask.OTHER]
};

export const TaskTypeDescriptions: Record<string, string> = {
  meditation: 'Daily Meditation',
  prayer: 'Prayer & Chanting',
  fasting: 'Fasting',
  charity: 'Charitable Giving',
  service: 'Community Service',
  seva: 'Seva Activities',
  temple: 'Temple Visit',
  kirtan: 'Kirtan & Devotional Music',
  study: 'Scripture Study',
  other: 'Other'
};

export const TaskTypeToBackendTypeMap: Record<string, string> = {
  'Daily Meditation': 'meditation',
  'Prayer & Chanting': 'prayer',
  Fasting: 'fasting',
  'Charitable Giving': 'charity',
  'Community Service': 'service',
  'Seva Activities': 'seva',
  'Temple Visit': 'temple',
  'Kirtan & Devotional Music': 'kirtan',
  'Scripture Study': 'study',
  Other: 'other'
};

export const CategoryIconsMap: Record<string, JSX.Element> = {
  'Study & Learning': <BookStudy />,
  'Spiritual Practice': <SpiritualPractice />,
  'Community & Temple': <TempleCommunity />,
  'Service & Charity': <ServiceCharity />,
  Other: <Other />
};
