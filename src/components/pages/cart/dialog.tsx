import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

interface DialogSectionProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

function DialogSection({ open, onClose, onConfirm }: DialogSectionProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Purchase</DialogTitle>
      <DialogContent>
        <DialogContentText>Do you want to complete the purchase?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="primary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DialogSection;
