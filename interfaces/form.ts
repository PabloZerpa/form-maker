
interface Stat {
    visits: string;
    submissions: string;
    submissionRate: string;
    bounceRate: string;
    loading: boolean;
}

interface StatsCardProps {
    data?: Stat;
    loading: boolean;
}
