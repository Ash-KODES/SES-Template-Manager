import "@css/skeleton.css";

const TemplateItemSkeleton = () => {
  return (
    <tr class="tr-skeleton animate-pulse">
      <td>
        <span class="w-24px mr-3" />
        <span class="max-w-[300px] w-[80%]" />
      </td>
      <td>
        <span class="w-100px" />
      </td>
      <td class="text-center">
        <span class="mx-auto w-60px" />
      </td>
      <td class="text-right">
        <span class="w-22px" />
      </td>
    </tr>
  );
};

export default TemplateItemSkeleton;
