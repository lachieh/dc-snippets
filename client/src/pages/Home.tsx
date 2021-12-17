import DefaultLayout from '../layouts/Default';
import md from '../utils/md';

export default function Home() {
  const a = 'test';
  return (
    <DefaultLayout title="Home">
      {md`
        ## Getting Started

        This API can be used to create a new "project". You can then use the
        project to create new "snippets". A snippet is simply a string, but you
      `}
    </DefaultLayout>
  );
}
