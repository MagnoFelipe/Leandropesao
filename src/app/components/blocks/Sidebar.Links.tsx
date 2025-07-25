import { useMemo } from "react";
import { Page } from "app/nav";
import { useSetAtom } from "jotai";

import { TEvent, trackEvent } from "core/client";

import { ReactComponent as OverviewIcon } from "app/icons/Overview.svg";
import { ReactComponent as ReceiveIcon } from "app/icons/Receive.svg";
import { ReactComponent as SendIcon } from "app/icons/Send.svg";
import { ReactComponent as SwapIcon } from "app/icons/SwapIcon.svg";
import { ReactComponent as ContactsIcon } from "app/icons/Contacts.svg";
import { ReactComponent as WalletsIcon } from "app/icons/Wallets.svg";
import { ReactComponent as BuyIcon } from "app/icons/Buy-page.svg";
import { ReactComponent as SettingsIcon } from "app/icons/Settings.svg";
import { ReactComponent as SupportIcon } from "app/icons/Support.svg";
import { ReactComponent as ActivityIcon } from "app/icons/ActivityIcon.svg";
import * as SupportAlert from "app/components/elements/SupportAlert";
import { useDialog } from "app/hooks/dialog";
import { activityModalAtom, receiveModalAtom } from "app/atoms";
import { useActivityBadge, useSwapBadge, useAccounts } from "app/hooks";

const useSidebarLinks = () => {
  const { alert } = useDialog();
  const setActivityOpened = useSetAtom(activityModalAtom);
  const setReceiveOpened = useSetAtom(receiveModalAtom);
  const activityBadgeAmount = useActivityBadge();
  const { currentAccount } = useAccounts();

  const swapBadgeAmount = useSwapBadge(currentAccount.address);

  const NavLinksPrimary = useMemo(() => {
    return [
      {
        route: Page.Default,
        label: "Assets",
        Icon: OverviewIcon,
      },
      {
        label: "Activity",
        Icon: ActivityIcon,
        action: () => setActivityOpened([true, "replace"]),
        badge: activityBadgeAmount,
      },
      {
        route: Page.Transfer,
        label: "Send",
        Icon: SendIcon,
      },
      {
        label: "Receive",
        Icon: ReceiveIcon,
        action: () => setReceiveOpened([true, "replace"]),
      },
      {
        route: Page.Buy,
        label: "Buy",
        Icon: BuyIcon,
        action: () =>
          trackEvent(TEvent.BuyNavigated, {
            page: "dashboard",
          }),
      },
      {
        route: Page.Swap,
        label: "Swap",
        Icon: SwapIcon,
        badge: +swapBadgeAmount,
        action: () =>
          trackEvent(TEvent.SwapNavigated, {
            page: "dashboard",
          }),
      },
      // {
      //   route: Page.Rewards,
      //   label: "Rewards",
      //   Icon: RewardsIcon,
      // },
      // {
      //   label: "Bug bounty",
      //   Icon: BugIcon,
      //   action: () =>
      //     alert({
      //       title: <FindBug.Title />,
      //       content: <FindBug.Content />,
      //     }),
      // },
      // {
      //   route: Page.Apps,
      //   label: "Apps",
      //   Icon: AppsIcon,
      //   soon: true,
      // },
    ];
  }, [
    activityBadgeAmount,
    swapBadgeAmount,
    setActivityOpened,
    setReceiveOpened,
  ]);

  const NavLinksSecondary = useMemo(() => {
    return [
      {
        route: Page.Contacts,
        label: "Contacts",
        Icon: ContactsIcon,
      },
      {
        route: Page.Wallets,
        label: "Wallets",
        Icon: WalletsIcon,
      },
      {
        route: Page.Settings,
        label: "Settings",
        Icon: SettingsIcon,
      },
      {
        label: "Support",
        Icon: SupportIcon,
        action: () =>
          alert({
            title: <SupportAlert.Title />,
            content: <SupportAlert.Content />,
          }),
      },
    ];
  }, [alert]);

  return useMemo(
    () => ({
      NavLinksPrimary,
      NavLinksSecondary,
    }),
    [NavLinksPrimary, NavLinksSecondary],
  );
};

export default useSidebarLinks;
