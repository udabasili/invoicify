import useDisclosure from '@/hooks/useDisclosure';
import * as React from 'react';
import Button from '../Elements/Button/Button';
import { Drawer, DrawerProps } from '../Elements/Drawer';

type FormDrawerProps = {
  isDone: boolean;
  triggerButton: React.ReactElement;
  title: string;
  children: React.ReactNode;
  size?: DrawerProps['size'];
};

export const FormDrawer = ({
  title,
  children,
  isDone,
  triggerButton,
  size = 'md',
}: FormDrawerProps) => {
  const { close, open, isOpen } = useDisclosure();

  React.useEffect(() => {
    if (isDone) {
      close();
    }
  }, [isDone, close]);

  return (
    <>
      {React.cloneElement(triggerButton, { onClick: open })}
      <Drawer
        isOpen={isOpen}
        onClose={close}
        title={title}
        size={size}
        renderFooter={() => (
          <>
            <Button variant="inverse" size="sm" type='button' onClick={close}>
              Cancel
            </Button>
          </>
        )}
      >
        {children}
      </Drawer>
    </>
  );
};