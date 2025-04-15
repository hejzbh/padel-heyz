import FiltersBox from "@/modules/filters/components/FiltersBox";
import { getFilters } from "@/modules/filters/filters";
import MapContainer from "@/modules/map/components/MapContainer";
import CourtList from "@/modules/results/components/CourtList";
import { unstable_cache } from "next/cache";
import getCourts from "@/actions/getCourts";

export interface HomeSearchParams {
  q: string;
  lat: string;
  lon: string;
  page?: string;
  range: string;
  boundingbox: string;
}

interface Props {
  params: Promise<any>;
  searchParams: Promise<HomeSearchParams>;
}

const getData = unstable_cache(
  async (searchParams: HomeSearchParams) => {
    const { courts, pagination } = await getCourts({
      page: searchParams?.page,
      boundingbox: searchParams?.boundingbox,
      perPage: 9,
    });

    return {
      courts,
      pagination,
      filters: getFilters(searchParams),
    };
  },
  ["global_data"],
  {
    revalidate: 1000 * 60 * 10, // 10 minutes cache
  }
);

export default async function Home(props: Props) {
  const searchParams = await props.searchParams;
  const data = await getData(searchParams);

  return (
    <div className="h-full flex flex-col">
      <FiltersBox
        className="!z-[2000] relative container mx-auto mb-10 mt-5 px-3 md:px-0 md:mt-0"
        filters={data.filters || []}
      />
      <div className="h-full grid lg:grid-cols-2">
        <MapContainer
          className="h-full min-h-[270px] md:min-h-[500px]"
          searchParams={searchParams}
        />

        <div className="relative">
          <CourtList
            className="p-2 md:p-6 overflow-y-scroll scrollbar-hide lg:absolute top-0 left-0 w-full h-full"
            count={data?.pagination?.countItems}
            courts={data?.courts || []}
            pagination={data?.pagination}
            searchParams={searchParams}
          />
        </div>
      </div>
    </div>
  );
}
