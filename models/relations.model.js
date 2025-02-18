import User from "./user.model.js";
import Oquvmarkaz from "./oquvMarkaz.model.js";
import Oquvmarkazyonalish from "./oquvMarkazYonalish.model.js";
import Filial from "./filial.model.js";
import Comment from "./comment.model.js";
import Liked from "./liked.model.js";
import Sohafan from "./sohafan.model.js";
import Region from "./region.model.js";
import Resurs from "./resurs.model.js";
import resursCategory from "./resursCategory.model.js";
import resursItem from "./resursItem.model.js";
import Yonalish from "./yonalish.model.js";
import Yozilish from "./yozilish.model.js";

User.hasMany(Oquvmarkaz, { foreignKey: "userId" });
Oquvmarkaz.belongsTo(User, { foreignKey: "userId" });

Oquvmarkaz.belongsTo(Region, { foreignKey: "regionId" });
Region.hasMany(Oquvmarkaz, { foreignKey: "regionId" });

Oquvmarkaz.hasMany(Filial, { foreignKey: "oquvMarkazId" });
Filial.belongsTo(Oquvmarkaz, { foreignKey: "oquvMarkazId" });

User.hasMany(Comment, { foreignKey: "userId" });
Comment.belongsTo(User, { foreignKey: "userId" });

Oquvmarkaz.hasMany(Comment, { foreignKey: "oquvMarkazId" });
Comment.belongsTo(Oquvmarkaz, { foreignKey: "oquvMarkazId" });

User.hasMany(Liked, { foreignKey: "userId" });
Liked.belongsTo(User, { foreignKey: "userId" });

Oquvmarkaz.hasMany(Liked, { foreignKey: "oquvMarkazId" });
Liked.belongsTo(Oquvmarkaz, { foreignKey: "oquvMarkazId" });

Yonalish.hasMany(Oquvmarkazyonalish, { foreignKey: "yonalishId" });
Oquvmarkazyonalish.belongsTo(Yonalish, { foreignKey: "yonalishId" });

Oquvmarkaz.hasMany(Oquvmarkazyonalish, { foreignKey: "oquvMarkazId" });
Oquvmarkazyonalish.belongsTo(Oquvmarkaz, { foreignKey: "oquvMarkazId" });

Yonalish.belongsToMany(Sohafan, { through: "sohafan_yonalish", foreignKey: "yonalishId" });
Sohafan.belongsToMany(Yonalish, { through: "sohafan_yonalish", foreignKey: "sohafanId" });

User.hasMany(Resurs, { foreignKey: "userId" });
Resurs.belongsTo(User, { foreignKey: "userId" });

Resurs.belongsToMany(resursCategory, { through: resursItem, foreignKey: "resursId" });
resursCategory.belongsToMany(Resurs, { through: resursItem, foreignKey: "resursCategoryId" });

Resurs.hasMany(resursItem, { foreignKey: "resursId" });
resursItem.belongsTo(Resurs, { foreignKey: "resursId" });

resursCategory.hasMany(resursItem, { foreignKey: "resursCategoryId" });
resursItem.belongsTo(resursCategory, { foreignKey: "resursCategoryId" });

Yonalish.hasMany(Yozilish, { foreignKey: "yonalishId" });
Yozilish.belongsTo(Yonalish, { foreignKey: "yonalishId" });

User.hasMany(Yozilish, { foreignKey: "userId" });
Yozilish.belongsTo(User, { foreignKey: "userId" });
