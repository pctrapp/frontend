export interface IChangelog {
  title: string;
  text: string;
  date: Date;
  badge: 'feature' | 'improvement' | 'bugfix';
}

export const changelog: IChangelog[] = [
  {
    title: 'Updated settings page',
    badge: 'feature',
    date: new Date(2021, 6, 6),
    text: 'Over the past week we have strongly focused on creating a settings page which offers you as many options as possible to customize the behaviour of pctr.app and your profile in general.'
  }
]