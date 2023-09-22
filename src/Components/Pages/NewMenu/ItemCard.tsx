import {
  IconCircleCheck,
  IconCircleCheckFilled,
  IconCircleX,
} from "@tabler/icons-react";
import {
  Card,
  Image,
  Text,
  ActionIcon,
  Group,
  Center,
  createStyles,
  rem,
  Grid,
} from "@mantine/core";
import { TabValues } from "./NewMenu";
import { useDispatch } from "react-redux";
import { removeSelectedItem, selectItem } from "./NewMenuSlice";

const useStyles = createStyles((theme) => ({
  card: {
    position: "relative",
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    marginTop: 16,
    // width: 180,
  },
  title: {
    display: "block",
    marginTop: theme.spacing.md,
    marginBottom: rem(0),
  },
  action: {
    color: theme.colors.blue[5],
    borderRadius: 15,
  },
  selectedItemAction: {
    color: theme.colors.red[7],
  },
}));

interface ArticleCardProps {
  isSelected: boolean;
  image: string;
  title: string;
  price: number;
  tab: string;
  id: string;
}

export function ItemCard({
  image,
  title,
  price,
  tab,
  id,
  isSelected,
}: ArticleCardProps) {
  const { classes, cx } = useStyles();
  const dispatch = useDispatch();
  const isArchivedItemsTab = tab === TabValues.ARCHIVED_ITEMS;
  const isSelectedItemsTab = tab === TabValues.SELECTED_ITEMS;

  const onCheckClick = () => {
    if (isSelected) {
      dispatch(removeSelectedItem(id));
    } else {
      dispatch(selectItem(id));
    }
  };

  const onXClick = () => {
    dispatch(removeSelectedItem(id));
  };

  return (
    <Grid.Col sm={8} md={6} xl={4}>
      <Card withBorder radius="md" className={cx(classes.card)}>
        <Card.Section>
          <Image src={image} height={150} withPlaceholder />
        </Card.Section>

        <Text className={classes.title} fw={500}>
          {title}
        </Text>

        <Group position="apart">
          <Center>
            <Text fz="sm" inline>
              $ {price}
            </Text>
          </Center>

          <Group spacing={0} mr={0}>
            <ActionIcon
              className={cx(classes.action, {
                [classes.selectedItemAction]: isSelectedItemsTab,
              })}
              onClick={isArchivedItemsTab ? onCheckClick : onXClick}
            >
              {isArchivedItemsTab ? (
                <>
                  {isSelected ? (
                    <IconCircleCheckFilled size="1.5rem" />
                  ) : (
                    <IconCircleCheck size="1.5rem" />
                  )}
                </>
              ) : (
                <>
                  <IconCircleX size="1.5rem" />
                </>
              )}
            </ActionIcon>
          </Group>
        </Group>
      </Card>
    </Grid.Col>
  );
}
