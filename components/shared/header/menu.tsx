import { Button } from '@/components/ui/button';
import ModeToggle from './mode-toggle';
import Link from 'next/link';
import { EllipsisVertical, ShoppingCart } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import UserButton from './user-button';
import { getMyCart } from '@/lib/actions/cart.actions';
import { CartItem } from '@/types';

const CartButton = ({ count }: { count: number }) => (
  <Button asChild variant='ghost'>
    <Link href='/cart'>
      <span className='relative'>
        <ShoppingCart />
        {count > 0 && (
          <span className='absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold leading-none text-primary-foreground'>
            {count > 99 ? '99+' : count}
          </span>
        )}
      </span>
      Cart
    </Link>
  </Button>
);

const Menu = async () => {
  let cartCount = 0;
  try {
    const cart = await getMyCart();
    cartCount =
      (cart?.items as CartItem[] | undefined)?.reduce(
        (acc, item) => acc + item.qty,
        0
      ) ?? 0;
  } catch {
    cartCount = 0;
  }

  return (
    <div className='flex justify-end gap-3'>
      <nav className='hidden md:flex w-full max-w-xs gap-1'>
        <ModeToggle />
        <CartButton count={cartCount} />
        <UserButton />
      </nav>
      <nav className='md:hidden'>
        <Sheet>
          <SheetTrigger className='align-middle'>
            <EllipsisVertical />
          </SheetTrigger>
          <SheetContent className='flex flex-col items-start'>
            <SheetTitle>Menu</SheetTitle>
            <ModeToggle />
            <CartButton count={cartCount} />
            <UserButton />
            <SheetDescription></SheetDescription>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
};

export default Menu;
