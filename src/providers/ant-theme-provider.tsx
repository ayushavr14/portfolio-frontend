import { ConfigProvider, theme } from "antd";
import React from "react";

const { darkAlgorithm } = theme;

const colors = {
  secondaryText: "white",
  primaryText: "white",
};

const AntThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ConfigProvider
      theme={{
        algorithm: darkAlgorithm,

        token: {
          colorPrimary: "#9747FF",
          colorInfo: "#9747FF",
          colorTextBase: colors.primaryText,
          fontFamily: "Inter",
          colorBgContainer: "#1c1c24",
          // colorBgElevated: "#13131a",
        },
        components: {
          Button: {
            paddingInline: 8,
            paddingBlock: 4,
          },
          Form: {
            verticalLabelPadding: 0,
            labelFontSize: 16,
            labelColor: colors.secondaryText,
          },
          Breadcrumb: {
            colorText: colors.secondaryText,
          },
          Input: {
            colorTextPlaceholder: "#838488",
          },
          InputNumber: {
            colorTextPlaceholder: "#838488",
            colorBgContainer: "#ffffff00",
          },
          Modal: {
            contentBg: "#1c1c24",
            headerBg: "#1c1c24",
          },
          Card: {
            colorBgContainer: "#1c1c24",
          },
          Dropdown: {
            // colorBgElevated: "#1c1c24",
          },
          Select: {
            colorPrimaryHover: "white",
            // colorBgElevated: "#1c1c24",
          },
          Segmented: {
            trackBg: "#13131a",
            itemSelectedBg: "#1c1c24",
            itemHoverBg: "#1c1c24",
          },
          DatePicker: {
            colorPrimaryHover: "white",
            // colorBgElevated: "#1c1c24",
            colorBgContainer: "#1c1c24",
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default AntThemeProvider;
