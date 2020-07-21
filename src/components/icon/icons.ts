import close from "assets/icons/close.svg";
import comment from "assets/icons/comment.svg";
import deleteIcon from "assets/icons/delete.svg";
import heart from "assets/icons/heart.svg";
import hive from "assets/icons/hextacular.svg";
import home from "assets/icons/home.svg";
import link from "assets/icons/link.svg";
import menu from "assets/icons/menu.svg";
import paper from "assets/icons/paper.svg";
import refresh from "assets/icons/refresh.svg";
import remove from "assets/icons/remove.svg";
import search from "assets/icons/search.svg";
import setting from "assets/icons/setting.svg";
import trash from "assets/icons/trash.svg";
import warning from "assets/icons/warning.svg";

export const icons = {
  close,
  comment,
  delete: deleteIcon,
  heart,
  hive,
  home,
  link,
  menu,
  paper,
  refresh,
  remove,
  search,
  setting,
  trash,
  warning,
};

export type IconType = keyof typeof icons;
