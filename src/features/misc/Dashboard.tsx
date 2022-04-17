import { ContentLayout } from '@/components/Layout';

export const Dashboard = () => {
  return (
    <ContentLayout title="Dashboard">
      <h1 className="text-xl mt-2">
        Welcome <b></b>
      </h1>
      <h4 className="my-3">
        Your role is 
      </h4>
      <p className="font-medium">In this application you can:</p>
        <ul className="my-4 list-inside list-disc">
          <li>Create comments in discussions</li>
          <li>Delete own comments</li>
        </ul>
        <ul className="my-4 list-inside list-disc">
          <li>Create discussions</li>
          <li>Edit discussions</li>
          <li>Delete discussions</li>
          <li>Comment on discussions</li>
          <li>Delete all comments</li>
        </ul>
    </ContentLayout>
  );
};