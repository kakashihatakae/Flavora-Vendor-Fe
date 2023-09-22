import {
  Group,
  Text,
  rem,
  Modal,
  createStyles,
  TextInput,
  NumberInput,
  Button,
} from "@mantine/core";
import {
  IconUpload,
  IconPhoto,
  IconX,
  IconCurrencyDollar,
} from "@tabler/icons-react";
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { UxString } from "../../Shared/Strings";
import { useState } from "react";

import { BASE_URL } from "../../Shared/const";
import { useDispatch } from "react-redux";
import { addItem } from "./NewMenuSlice";
import { addNewItem } from "./ApiHelper";

const useStyles = createStyles((theme) => ({
  inputsStyle: {
    display: "flex",
    flexDirection: "row",
    marginTop: theme.spacing.sm,
  },
  submitButton: {
    display: "flex",
    marginTop: theme.spacing.sm,
    justifyContent: "flex-end",
  },
}));

interface NewItemModalProps {
  modalOpen: boolean;
  onCloseModal: () => void;
  dropzoneProps?: Partial<DropzoneProps>;
}

const NewItemModal = ({
  modalOpen,
  onCloseModal,
  dropzoneProps,
}: NewItemModalProps) => {
  // const theme = useMantineTheme();
  const dispatch = useDispatch();
  const { theme, classes } = useStyles();
  const [price, setPrice] = useState<number | "">(0);
  const [name, setName] = useState("");

  const onClick = async () => {
    onCloseModal();
    addNewItem({ price: Number(price), name, dispatch });
  };

  return (
    <>
      <Modal
        opened={modalOpen}
        onClose={onCloseModal}
        title={
          <Text size={theme.fontSizes.lg} weight={700}>
            {UxString.NewMenu.NewItemModal}
          </Text>
        }
        centered
      >
        <Dropzone
          onDrop={(files) => console.log("accepted files", files)}
          onReject={(files) => console.log("rejected files", files)}
          maxSize={3 * 1024 ** 2}
          accept={IMAGE_MIME_TYPE}
          {...dropzoneProps}
        >
          <Group
            position="center"
            spacing="xl"
            style={{ minHeight: rem(220), pointerEvents: "none" }}
          >
            <Dropzone.Accept>
              <IconUpload
                size="3.2rem"
                stroke={1.5}
                color={
                  theme.colors[theme.primaryColor][
                    theme.colorScheme === "dark" ? 4 : 6
                  ]
                }
              />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconX
                size="3.2rem"
                stroke={1.5}
                color={theme.colors.red[theme.colorScheme === "dark" ? 4 : 6]}
              />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <IconPhoto size="3.2rem" stroke={1.5} />
            </Dropzone.Idle>

            <div>
              <Text size="xl" inline>
                Select Item images here
              </Text>
              <Text size="sm" color="dimmed" inline mt={7}>
                Drag images here or click to select files
              </Text>
            </div>
          </Group>
        </Dropzone>
        <Group className={classes.inputsStyle} position="apart">
          <TextInput
            placeholder="Food Item Name"
            w={250}
            onChange={(value) => setName(value.target.value)}
          />
          <NumberInput
            placeholder="Price"
            min={0}
            w={140}
            decimalSeparator="."
            precision={2}
            removeTrailingZeros
            icon={<IconCurrencyDollar size="0.8rem" />}
            width="100%"
            onChange={(value) => setPrice(value)}
          />
        </Group>
        <div className={classes.submitButton}>
          <Button onClick={onClick}>Submit</Button>
        </div>
      </Modal>
    </>
  );
};

export default NewItemModal;
