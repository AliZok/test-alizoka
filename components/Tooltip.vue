<template>
        <div class="right-0 bottom-[33px] !z-100 absolute bg-amber-400 px-2 py-2 rounded-xl min-w-[100px] text-[10px]">
            <div class="relative">
                <slot></slot>
                <div class="tooltip-triangle"></div>
            </div>
        </div>
</template>

<style scoped>
.tooltip-triangle {

    right: 4px !important;
    bottom: -15px;
    position: absolute;
    width: 0;
	height: 0;
	border-left: 5px solid transparent;
	border-right: 5px solid transparent;
	border-top: 8px solid #fbbf24;

  }
  
</style>