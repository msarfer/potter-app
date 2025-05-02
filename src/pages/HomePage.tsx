import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { FormattedMessage } from "react-intl";
import { Form, Link } from "react-router-dom";

const sections = ["books", "characters", "spells", "houses"];

export default function HomePage() {
  return (
    <main className="container mx-auto py-12 px-4">
      <section className="text-center">
        <h2 className="text-3xl font-semibold mb-6">
          <FormattedMessage id="home.title" />
        </h2>
        <p className="text-lg mb-8">
          <FormattedMessage id="home.description" />
        </p>
      </section>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 mb-10">
        {sections.map((section) => (
          <HomeCard key={`home-card-${section}`} section={section} />
        ))}
      </div>
      <HomeCard section="404" />
    </main>
  );
}

interface HomeCard {
  section: string;
}

const HomeCard: React.FC<HomeCard> = ({ section }) => {
  return (
    <Card className="hover:scale-103 hover:border-yellow-400 hover:transition-all hover:duration-100 transform transition bg-neutral-50 dark:bg-transparent">
      <CardHeader className="h-1/2">
        <CardTitle className="dark:text-gray-100">
          <FormattedMessage id={`navbar.link.${section}`} />
        </CardTitle>
        <CardDescription>
          <FormattedMessage id={`home.${section}`} />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Link
          to={`/${section}`}
          className="dark:text-gray-400 hover:text-yellow-400 dark:hover:text-yellow-400"
        >
          <FormattedMessage id="home.more" />
        </Link>
      </CardContent>
    </Card>
  );
};
