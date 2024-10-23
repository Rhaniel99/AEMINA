import * as Dialog from '@radix-ui/react-dialog';

export default function Dialogs() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button>Open Dialog</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content>
          <Dialog.Title>Dialog Title</Dialog.Title>
          <Dialog.Description>
            This is an example of a dialog.
          </Dialog.Description>
          <button onClick={() => Dialog.close()}>Close</button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}