import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Avatar from "../atoms/avatar/Avatar";
import "./Card.css";

type PropsType = {
  img: string;
  name: string;
};

export default function ActionAreaCard(props: PropsType) {
  const { img, name } = props;
  console.log(img);
  console.log(name);
  return (
    <Card className="Card__card" sx={{ maxWidth: 250 }}>
      <Avatar />
      <CardActionArea>
        <CardContent>
          <Typography
            className="Card__card__font"
            gutterBottom
            variant="h5"
            component="div"
          >
            {name}
          </Typography>
          <Typography
            className="Card__card__font-selfIntro"
            variant="body2"
            color="text.secondary"
          >
            {img}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
