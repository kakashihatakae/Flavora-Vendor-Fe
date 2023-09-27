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
import { useDispatch } from "react-redux";
import { addNewItem, handleUpload } from "./ApiHelper";

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
  const [file, setFile] = useState<File>();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const showSubmitButton = file && price && name;

  const onClick = async () => {
    if (!file) {
      return;
    }
    setUploading(true);
    try {
      const newFileName = String(Date.now());
      await handleUpload(file, newFileName);
      await addNewItem({
        price: Number(price),
        name,
        dispatch,
        image: `https://food-items.s3.us-east-2.amazonaws.com/menu-items-pics/${newFileName}`,
      });
      onCloseModal();
    } catch (error) {
      setError(true);
      console.log(`error: ${error}`);
    }
    setFile(undefined);
    setUploading(false);
  };

  const onClose = () => {
    setFile(undefined);
    setError(false);
    onCloseModal();
  };

  return (
    <>
      <Modal
        opened={modalOpen}
        onClose={onClose}
        title={
          <Text size={theme.fontSizes.lg} weight={700}>
            {UxString.NewMenu.NewItemModal}
          </Text>
        }
        centered
      >
        {error && (
          <Text color={theme.colors.red[7]} mb={8}>
            There was an unexpected eror
          </Text>
        )}
        <Dropzone
          onDrop={(files) => {
            setFile(files[0]);
            setError(false);
          }}
          onReject={(files) => console.log("rejected files", files)}
          maxSize={3 * 1024 ** 2}
          accept={IMAGE_MIME_TYPE}
          {...dropzoneProps}
        >
          <Group
            position="center"
            spacing="xl"
            style={{ minHeight: rem(120), pointerEvents: "none" }}
          >
            <Dropzone.Accept>
              <div style={{ display: "flex" }}>
                <IconUpload
                  size="3.2rem"
                  stroke={1.5}
                  color={
                    theme.colors[theme.primaryColor][
                      theme.colorScheme === "dark" ? 4 : 6
                    ]
                  }
                />
                <div>
                  <Text size="xl" inline>
                    Select Item images here
                  </Text>
                  <Text size="sm" color="dimmed" inline mt={7}>
                    Drag images here or click to select files
                  </Text>
                </div>
              </div>
            </Dropzone.Accept>
            <Dropzone.Reject>
              <div style={{ display: "flex" }}>
                <IconX
                  size="3.2rem"
                  stroke={1.5}
                  color={theme.colors.red[theme.colorScheme === "dark" ? 4 : 6]}
                />
                <div>
                  <Text size="xl" inline>
                    Select Item images here
                  </Text>
                  <Text size="sm" color="dimmed" inline mt={7}>
                    Drag images here or click to select files
                  </Text>
                </div>
              </div>
            </Dropzone.Reject>

            <Dropzone.Idle>
              {file ? (
                <>
                  <Text size="xl" inline>
                    {file.name}
                  </Text>
                  <Text size="sm" color="dimmed" inline mt={7}>
                    Drag images here or click to select files
                  </Text>
                </>
              ) : (
                <div style={{ display: "flex" }}>
                  <IconPhoto size="3.2rem" stroke={1.5} />
                  <div>
                    <Text size="xl" inline>
                      Select Item images here
                    </Text>
                    <Text size="sm" color="dimmed" inline mt={7}>
                      Drag images here or click to select files
                    </Text>
                  </div>
                </div>
              )}
            </Dropzone.Idle>
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
          <Button
            onClick={onClick}
            disabled={!showSubmitButton}
            loading={uploading}
          >
            Submit
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default NewItemModal;
