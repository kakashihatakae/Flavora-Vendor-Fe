import { useState } from "react";
import {
  Navbar,
  Center,
  Tooltip,
  UnstyledButton,
  createStyles,
  Stack,
  rem,
  Text,
} from "@mantine/core";
import {
  IconHome2,
  IconUser,
  IconSettings,
  IconLogout,
} from "@tabler/icons-react";
import { FE_PAGE_PATHS } from "../../Shared/const";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { useDispatch } from "react-redux";
import { logout } from "../Login/Authlice";

const useStyles = createStyles((theme) => ({
  linkSubText: {
    fontSize: theme.fontSizes.xs,
  },
  link: {
    width: rem(50),
    height: rem(50),
    borderRadius: theme.radius.md,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[0],
    },
  },

  active: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
    },
  },
}));

interface NavbarLinkProps {
  icon: React.FC<any>;
  label: string;
  active?: boolean;
  onClick?(): void;
  subText?: string;
}

function NavbarLink({
  icon: Icon,
  label,
  active,
  onClick,
  subText,
}: NavbarLinkProps) {
  const { classes, cx } = useStyles();
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton
        onClick={onClick}
        className={cx(classes.link, { [classes.active]: active })}
      >
        <Icon size="1.2rem" stroke={1.5} />
        <Text className={classes.linkSubText}>{subText}</Text>
      </UnstyledButton>
    </Tooltip>
  );
}

const mockdata = [
  { icon: IconHome2, label: "Home", path: FE_PAGE_PATHS.HOME, subText: "Home" },
  { icon: IconUser, label: "Account", path: "", subText: "Profile" },
  { icon: IconSettings, label: "Settings", path: "", subText: "Settings" },
];

export function NavbarMinimal() {
  const [active, setActive] = useState(2);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const links = mockdata.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => {
        setActive(index);
        navigate(link.path);
      }}
    />
  ));

  const onLogOut = () => {
    dispatch(logout());
  };

  return (
    <Navbar height="100vh" width={{ base: 80 }} p="md">
      <Center>
        <Text size="lg" variant="gradient">
          F
        </Text>
      </Center>
      {/* <Navbar.Section grow mt={50}> */}
      <Navbar.Section mt={50}>
        <Stack justify="center" spacing={0}>
          {links}
        </Stack>
      </Navbar.Section>
      <Navbar.Section>
        <Stack justify="center" spacing={0}>
          <NavbarLink
            icon={IconLogout}
            label="Logout"
            subText="Logout"
            onClick={onLogOut}
          />
        </Stack>
      </Navbar.Section>
    </Navbar>
  );
}
